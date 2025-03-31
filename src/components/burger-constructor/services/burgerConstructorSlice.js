import {createSlice} from "@reduxjs/toolkit";

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState: {
		constructorList: [], // Список добавленных ингредиентов [{item: {}, id: 1}] // id - порядковый номер
	},
	reducers: {
		addIngredientToConstructor: (state, action) => {
			state.constructorList.push(action.payload);
		},
		removeIngredientFromConstructor: (state, action) => {
			state.constructorList.splice(action.payload, 1);
		},
		setIngredientsConstructorList: (state, action) => {
			state.constructorList = action.payload;
		},
	},
});
export const { addIngredientToConstructor, removeIngredientFromConstructor, setIngredientsConstructorList } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
