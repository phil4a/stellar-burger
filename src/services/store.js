import { configureStore } from '@reduxjs/toolkit';
import currentIngredientSlice from './currentIngredientSlice';

export const store = configureStore({
	reducer: {
		currentIngredient: currentIngredientSlice,
	},
});
