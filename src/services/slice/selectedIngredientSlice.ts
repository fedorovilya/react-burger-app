import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredientsResponse';

export interface SelectedIngredientData {
	status: 'idle' | 'loading' | 'success' | 'fail';
	error: string | null;
	selectedIngredient: Ingredient | null;
}

const initialState: SelectedIngredientData = {
	selectedIngredient: null,
	status: 'idle',
	error: null,
};

const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredient',
	initialState: initialState,
	reducers: {
		setSelected: (state, action) => {
			state.selectedIngredient = action.payload;
		},
		detachSelected: (state) => {
			state.selectedIngredient = null;
		},
	},
});

export const { setSelected, detachSelected } = selectedIngredientsSlice.actions;
export default selectedIngredientsSlice.reducer;
