import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from "@utils/request";

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
			return await request('ingredients');
		} catch (error) {
			const errorMessage = error.message || error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState: ingredientsInitialState,
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
				state.error = `Ошибка получения списка ингредиентов: ${action.payload}`;
				state.status = 'fail';
				state.ingredients = [];
			});
	},
});

export default burgerIngredientsSlice.reducer;
