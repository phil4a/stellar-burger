import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action) => {
			state.ingredient = action.payload;
		},
	},
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
