import { configureStore } from '@reduxjs/toolkit';
import currentIngredientSlice from './current-ingredient-slice';
import ingredientsSlice from './ingredients-slice';
import orderSlice from './order-slice';

export const store = configureStore({
	reducer: {
		currentIngredient: currentIngredientSlice,
		ingredients: ingredientsSlice,
		currentOrder: orderSlice,
	},
});
