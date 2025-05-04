import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import burgerIngredientsReducer from '@services/slice/burgerIngredientsSlice';
import selectedIngredientReducer from '@services/slice/selectedIngredientSlice';
import burgerConstructorReducer from '@services/slice/burgerConstructorSlice';
import orderReducer from '@services/slice/orderSlice';
import userReducer from '@services/slice/userSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
	reducer: {
		ingredients: burgerIngredientsReducer,
		selectedIngredient: selectedIngredientReducer,
		burgerConstructor: burgerConstructorReducer,
		order: orderReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;