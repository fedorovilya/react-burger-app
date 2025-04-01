import { compose, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import burgerIngredientsReducer from '@components/burger-ingredients/services/burgerIngredientsSlice';
import burgerConstructorReducer from '@components/burger-constructor/services/burgerConstructorSlice';
import orderReducer from '@components/burger-constructor/services/orderSlice';

export const store = configureStore({
	reducer: {
		ingredients: burgerIngredientsReducer,
		constructor: burgerConstructorReducer,
		order: orderReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
