import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: {
		bun: null,
		ingredients: [], // Список добавленных ингредиентов [{item: {}, id: 1}] // id - порядковый номер
	},
	reducers: {
		addIngredientToConstructor: (state, action) => {
			state.ingredients.push({ id: uuidv4(), item: action.payload });
		},
		removeIngredientFromConstructor: (state, action) => {
			state.ingredients.filter((element) => element.id !== action.payload);
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
