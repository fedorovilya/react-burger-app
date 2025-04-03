import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import burgerIngredientsReducer from '@services/slice/burgerIngredientsSlice';
import selectedIngredientReducer from '@services/slice/selectedIngredientSlice';
import burgerConstructorReducer from '@services/slice/burgerConstructorSlice';
import orderReducer from '@services/slice/orderSlice';

export const store = configureStore({
	reducer: {
		ingredients: burgerIngredientsReducer,
		selectedIngredient: selectedIngredientReducer,
		burgerConstructor: burgerConstructorReducer,
		order: orderReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
