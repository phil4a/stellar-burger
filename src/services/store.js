import { configureStore } from '@reduxjs/toolkit';
import currentIngredientSlice from './current-ingredient-slice';
import ingredientsSlice from './ingredients-slice';
import constructorSlice from './constructor-slice';
import orderSlice from './order-slice';

import authSlice from './auth/auth-slice';

export const store = configureStore({
	reducer: {
		currentIngredient: currentIngredientSlice,
		ingredients: ingredientsSlice,
		currentOrder: orderSlice,
		burgerConstructor: constructorSlice,
		auth: authSlice,
	},
});
