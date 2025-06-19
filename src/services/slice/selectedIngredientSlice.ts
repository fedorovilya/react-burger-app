import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredientsResponse';

export interface SelectedIngredientData {
	selectedIngredient: Ingredient | null;
}

export const initialState: SelectedIngredientData = {
	selectedIngredient: null,
};

const selectedIngredientSlice = createSlice({
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

export const { setSelected, detachSelected } = selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
