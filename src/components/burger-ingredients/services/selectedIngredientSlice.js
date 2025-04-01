import {createSlice} from "@reduxjs/toolkit";

const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredient',
	initialState: {
		selectedIngredient: null,
	},
	reducers: {
		setSelected: (state, action) => {
			state.selectedIngredient = action.payload;
		},
		detachSelected: (state) => {
			state.selectedIngredient = null;
		},
	}
});

export const {setSelected, detachSelected} = selectedIngredientsSlice.actions;
export default selectedIngredientsSlice.reducer;
