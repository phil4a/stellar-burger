import { createSlice, createSelector, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';
import { RootState } from '../store';

interface IConstructorState {
	bun: IIngredient | null;
	ingredients: IIngredient[];
}

export const initialState: IConstructorState = {
	bun: null,
	ingredients: [],
};

export const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setBun(state, action: PayloadAction<IIngredient>) {
			state.bun = action.payload;
		},
		addIngredient(state, action: PayloadAction<IIngredient>) {
			state.ingredients.push({
				...action.payload,
				nanoid: action.payload.nanoid || nanoid(),
			});
		},
		moveIngredients(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
			const { dragIndex, hoverIndex } = action.payload;
			const dragIngredient = state.ingredients[dragIndex];
			const newIngredients = [...state.ingredients];
			newIngredients.splice(dragIndex, 1);
			newIngredients.splice(hoverIndex, 0, dragIngredient);
			state.ingredients = newIngredients;
		},
		deleteIngredient(state, action: PayloadAction<IIngredient['nanoid']>) {
			state.ingredients = state.ingredients.filter((item) => item.nanoid !== action.payload);
		},
		clearIngredients(state) {
			state.bun = null;
			state.ingredients = [];
		},
	},
});

export const totalPriceSelector = createSelector(
	[
		(state: RootState) => state.burgerConstructor.ingredients,
		(state: RootState) => state.burgerConstructor.bun,
	],
	(ingredients, bun) => {
		const ingredientsCost = ingredients.reduce(
			(total: number, item: IIngredient) => total + item.price,
			0,
		);
		const bunCost = bun ? bun.price * 2 : 0;
		return ingredientsCost + bunCost;
	},
);

export const { setBun, deleteIngredient, addIngredient, moveIngredients, clearIngredients } =
	constructorSlice.actions;

export default constructorSlice.reducer;
