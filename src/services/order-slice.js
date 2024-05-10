import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchWithRefresh } from '../utils/api';

const initialState = {
	orderNumber: null,
	status: 'idle',
	error: null,
	isSendingOrder: false,
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
				state.isSendingOrder = true;
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isSendingOrder = false;
				state.orderNumber = action.payload.order.number;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.isSendingOrder = false;
				state.error = action.error.message;
			});
	},
});

export const sendOrder = createAsyncThunk('currentOrder/send', async (ingredientIds) => {
	const accessToken = localStorage.getItem('accessToken');
	const response = await fetchWithRefresh('orders', {
		method: 'POST',
		headers: {
			Authorization: accessToken,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
	return response;
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
