import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_INGREDIENTS_ENDPOINT} from "../../../const/const";

const ingredientsInitialState = {
	ingredients: [],
	selectedIngredient: null,
	status: 'idle', // 'idle' | 'loading' | 'success' | 'fail'
	error: null,
}

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(API_INGREDIENTS_ENDPOINT);
			if (!response.ok) {
				throw new Error('Ошибка получения списка ингредиентов');
			}
			return await response.json();
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

const burgerIngredientsSlice = createSlice({
	name: 'ingredients',
	initialState: ingredientsInitialState,
	reducers: {
		setSelected: (state, action) => {
			state.selectedIngredient = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.error = null;
				state.status = 'loading'
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'success'
				state.ingredients = action.payload
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.error = action.payload || 'Ошибка получения списка ингредиентов';
				state.status = 'error'
				state.ingredients = action.payload
			})
	}
})

export const {selectedIngredient} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;