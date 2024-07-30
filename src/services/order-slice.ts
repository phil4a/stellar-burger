import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchWithRefresh } from '../utils/api';
import { Status } from '../utils/types';

interface IOrderState {
	orderNumber: number | null;
	status: Status;
	error: string | null;
	isSendingOrder: boolean;
	recievedOrderById: IOrderResponse | null;
}

interface IOrderResponse {
	order: {
		number: number;
	};
}

const initialState: IOrderState = {
	orderNumber: null,
	status: Status.IDLE,
	error: null,
	isSendingOrder: false,
	recievedOrderById: null,
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
			.addCase(sendOrder.pending, (state) => {
				state.status = Status.LOADING;
				state.isSendingOrder = true;
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				state.isSendingOrder = false;
				state.orderNumber = action.payload.order.number;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.status = Status.ERROR;
				state.isSendingOrder = false;
				if (action.error.message !== undefined) {
					state.error = action.error.message;
				}
			})
			.addCase(fetchOrderById.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				state.recievedOrderById = action.payload;
			})
			.addCase(fetchOrderById.rejected, (state, action) => {
				state.status = Status.ERROR;
				if (action.error.message !== undefined) {
					state.error = action.error.message;
				}
			});
	},
});

export const sendOrder = createAsyncThunk<IOrderResponse, string[]>(
	'currentOrder/send',
	async (ingredientIds) => {
		const accessToken = localStorage.getItem('accessToken');
		const response = await fetchWithRefresh('orders', {
			method: 'POST',
			headers: {
				Authorization: accessToken || '',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		});
		return response as Promise<IOrderResponse>;
	},
);

export const fetchOrderById = createAsyncThunk<IOrderResponse, string>(
	'currentOrder/fetchById',
	async (orderId) => {
		const accessToken = localStorage.getItem('accessToken');

		const response = await fetchWithRefresh(`orders/${orderId}`, {
			method: 'GET',
			headers: {
				Authorization: accessToken || '',
				'Content-Type': 'application/json',
			},
		});
		return response as Promise<IOrderResponse>;
	},
);

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
