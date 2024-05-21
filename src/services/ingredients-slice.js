import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '../utils/api';

const initialState = {
	ingredients: [],
	status: 'idle',
	error: null,
	isFetchingIngredients: false,
};
export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		increaseIngredientsCounter(state, action) {
			const { _id, type } = action.payload;
			if (type === 'bun') {
				state.ingredients = state.ingredients.map((ingredient) => {
					if (ingredient.type === 'bun') {
						return { ...ingredient, count: 0 };
					}
					return ingredient;
				});
			}
			const index = state.ingredients.findIndex((ingredient) => ingredient._id === _id);
			if (index !== -1) {
				if (type === 'bun') {
					state.ingredients[index].count = 2;
				} else {
					state.ingredients[index].count += 1;
				}
			}
		},
		decreaseIngredientsCounter(state, action) {
			const { _id } = action.payload;
			state.ingredients = state.ingredients.map((ingredient) => {
				if (ingredient._id === _id) {
					ingredient.count -= 1;
				}
				return ingredient;
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getIngredientsFromServer.pending, (state, action) => {
				state.status = 'loading';
				state.isFetchingIngredients = true;
			})
			.addCase(getIngredientsFromServer.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isFetchingIngredients = false;
				state.ingredients = action.payload.data.map((ingredient) => ({
					...ingredient,
					count: ingredient.count || 0,
				}));
			})

			.addCase(getIngredientsFromServer.rejected, (state, action) => {
				state.status = 'failed';
				state.isFetchingIngredients = false;
				state.error = action.error.message;
			});
	},
});

export const { increaseIngredientsCounter, decreaseIngredientsCounter } = ingredientsSlice.actions;

export const getIngredientsFromServer = createAsyncThunk('ingredients/fetch', async () => {
	return await fetchWithRefresh('ingredients');
});

export default ingredientsSlice.reducer;
