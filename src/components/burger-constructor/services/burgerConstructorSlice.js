import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: {
		bun: null,
		ingredients: [], // Список добавленных ингредиентов [{item: {}, id: 1}] // id - порядковый номер
	},
	reducers: {
		addIngredientToConstructor: (state, action) => {
			state.ingredients.push(action.payload);
		},
		removeIngredientFromConstructor: (state, action) => {
			if (!state.ingredients) return [];
			state.ingredients = state.ingredients?.filter(
				(element) => element.id !== action.payload
			);
		},
		setIngredientsConstructorList: (state, action) => {
			state.ingredients = action.payload;
		},
		setBun: (state, action) => {
			state.bun = action.payload;
		},
	},
});

export const {
	addIngredientToConstructor,
	removeIngredientFromConstructor,
	setIngredientsConstructorList,
	setBun,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
