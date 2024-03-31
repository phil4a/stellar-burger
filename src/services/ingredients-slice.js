import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from './constants';

const initialState = {
	ingredients: [],
	status: 'idle',
	error: null,
};
export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getIngredientsFromServer.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getIngredientsFromServer.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.ingredients = action.payload.data;
			})
			.addCase(getIngredientsFromServer.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getIngredientsFromServer = createAsyncThunk('ingredients/fetch', async () => {
	const response = await fetch(`${API_URL}/ingredients`);
	return await response.json();
});

export const { setIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
