import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredientsResponse';
import { ConstructorItem } from '../../types/constructorItem';

export interface ConstructorSliceData {
	bun: Ingredient | null;
	ingredients: ConstructorItem[];
}

const initialState: ConstructorSliceData = {
	bun: null,
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: initialState,
	reducers: {
		addIngredientToConstructor: (state, action) => {
			state.ingredients.push(action.payload);
		},
		removeIngredientFromConstructor: (state, action) => {
			state.ingredients = state.ingredients?.filter(
				(element) => element.id !== (action.payload as string)
			);
		},
		setIngredientsConstructorList: (state, action) => {
			state.ingredients = action.payload;
		},
		setBun: (state, action) => {
			state.bun = action.payload;
		},
		clearList: () => {
			return {
				bun: null,
				ingredients: [],
			};
		},
	},
});

export const {
	addIngredientToConstructor,
	removeIngredientFromConstructor,
	setIngredientsConstructorList,
	setBun,
	clearList,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
