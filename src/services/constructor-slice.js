import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

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
		addIngredient(state, action) {
			state.ingredients.push(action.payload);
		},
		moveIngredients(state, action) {
			const { dragIndex, hoverIndex } = action.payload;
			const dragIngredient = state.ingredients[dragIndex];
			const newIngredients = [...state.ingredients];
			newIngredients.splice(dragIndex, 1);
			newIngredients.splice(hoverIndex, 0, dragIngredient);
			state.ingredients = newIngredients;
		},
		deleteIngredient(state, action) {
			state.ingredients = state.ingredients.filter((item) => item.nanoid !== action.payload);
		},
		clearIngredients(state) {
			state.bun = null;
			state.ingredients = [];
		},
	},
});

export const addIngredient = (ingredient) => {
	return {
		type: constructorSlice.actions.addIngredient.type,
		payload: {
			...ingredient,
			nanoid: nanoid(),
		},
	};
};

export const totalPriceSelector = createSelector(
	[(state) => state.burgerConstructor.ingredients, (state) => state.burgerConstructor.bun],
	(ingredients, bun) => {
		const ingredientsCost = ingredients.reduce((total, item) => total + item.price, 0);
		const bunCost = bun ? bun.price * 2 : 0;
		return ingredientsCost + bunCost;
	},
);

export const { setBun, setIngredients, deleteIngredient, moveIngredients, clearIngredients } =
	constructorSlice.actions;

export default constructorSlice.reducer;
