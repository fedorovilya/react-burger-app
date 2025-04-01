import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_INGREDIENTS_ENDPOINT} from '../../../const/const';

const ingredientsInitialState = {
	ingredients: [],
	selectedIngredient: null,
	status: 'idle', // 'idle' | 'loading' | 'success' | 'fail'
	error: null,
};

export const fetchIngredients = createAsyncThunk(
	'burgerIngredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(API_INGREDIENTS_ENDPOINT);
			let json = await response.json();
			if (!json.success) {
				throw new Error(
					`Удаленный сервер вернул ошибку при получении списка ингредиентов: status=${json.success}`
				);
			}
			return json;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message || 'Ошибка получения списка ингредиентов');
		}
	}
);

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState: ingredientsInitialState,
	reducers: {
		setSelected: (state, action) => {
			state.selectedIngredient = state.ingredients.find(
				(ingredient) => ingredient._id === action.payload
			);
		},
		detachSelected: (state) => {
			state.selectedIngredient = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'success';
				state.ingredients = action.payload.data;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.error = action.payload || 'Ошибка получения списка ингредиентов';
				state.status = 'fail';
				state.ingredients = [];
			});
	},
});

export const {setSelected, detachSelected} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
