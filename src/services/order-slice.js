import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { request } from '../utils/api';

const initialState = {
	orderNumber: null,
	status: 'idle',
	error: null,
};

export const orderSlice = createSlice({
	name: 'currentOrder',
	initialState,
	reducers: {
		clearCurrentOrder: (state) => {
			state.orderNumber = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(sendOrder.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderNumber = action.payload.order.number;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const sendOrder = createAsyncThunk('currentOrder/send', async (ingredientIds) => {
	const response = await request('orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
	return response;
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
