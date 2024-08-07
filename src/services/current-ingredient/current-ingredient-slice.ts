import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';

interface CurrentIngredientState {
	ingredient: IIngredient | null;
}

export const initialState: CurrentIngredientState = {
	ingredient: null,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action: PayloadAction<IIngredient>) => {
			state.ingredient = action.payload;
		},
	},
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
