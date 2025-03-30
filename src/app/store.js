import {compose, configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'

import burgerIngredientsSlice from "@components/burger-ingredients/services/burgerIngredientsSlice";

const store = configureStore({
	reducer: {
		ingredients: burgerIngredientsSlice,
		ingredientList: ingredientListReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;