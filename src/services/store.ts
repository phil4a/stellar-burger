import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
