import { createSlice } from '@reduxjs/toolkit';

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
			state.ingredients.push(action.payload);
		},
	},
});

export const { setBun, setIngredients } = constructorSlice.actions;

export default constructorSlice.reducer;
