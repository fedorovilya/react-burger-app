import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import {
	Ingredient,
	IngredientsResponse,
} from '../../types/ingredientsResponse';

export interface IngredientsSliceData {
	status: 'idle' | 'loading' | 'success' | 'fail';
	error: string | null;
	ingredients: Ingredient[] | null;
}

const initialState: IngredientsSliceData = {
	ingredients: [],
	status: 'idle', // 'idle' | 'loading' | 'success' | 'fail'
	error: null,
};

export const fetchIngredients = createAsyncThunk<IngredientsResponse>(
	'burgerIngredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			return (await request('ingredients')) as IngredientsResponse;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка получения списка ингредиентов: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState: initialState,
	reducers: {},
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
				state.error = action.payload as string;
				state.status = 'fail';
				state.ingredients = [];
			});
	},
});

export default burgerIngredientsSlice.reducer;
