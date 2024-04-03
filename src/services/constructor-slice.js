import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
	bun: null,
	ingredients: [],
};

export const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setBun(state, action) {
			state.bun = action.payload;
		},
		setIngredients(state, action) {
			state.ingredients = [...state.ingredients, { ...action.payload, uuid: uuid() }];
		},
		deleteIngredient(state, action) {
			state.ingredients = state.ingredients.filter((item) => item.uuid !== action.payload);
		},
	},
});
export const totalPriceSelector = createSelector(
	[(state) => state.burgerConstructor.ingredients, (state) => state.burgerConstructor.bun],
	(ingredients, bun) => {
		const ingredientsCost = ingredients.reduce((total, item) => total + item.price, 0);
		const bunCost = bun ? bun.price * 2 : 0;
		return ingredientsCost + bunCost;
	},
);

export const { setBun, setIngredients, deleteIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
