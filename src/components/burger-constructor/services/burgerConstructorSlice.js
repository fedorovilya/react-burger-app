import {createSlice} from "@reduxjs/toolkit";

const burgerConstructorSlice = createSlice({
	name: 'ingredientList',
	initialState: {
		constructorList: [], // Список ингредиентов
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
