import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchWithRefresh } from '../../utils/api';
import { Status } from '../../utils/types';
import { IWebsocketOrder } from '../../utils/websockets-types';

interface IOrderState {
	orderNumber: number | null;
	status: Status;
	error: string | null;
	isSendingOrder: boolean;
	recievedOrderByNumber: IWebsocketOrder | undefined;
}

interface IOrderResponse {
	orders: any;
	order: {
		number: number;
	};
}

const initialState: IOrderState = {
	orderNumber: null,
	status: Status.IDLE,
	error: null,
	isSendingOrder: false,
	recievedOrderByNumber: undefined,
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
			.addCase(fetchOrderByNumber.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				state.recievedOrderByNumber = action.payload.orders[0];
			})
			.addCase(fetchOrderByNumber.rejected, (state, action) => {
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

export const fetchOrderByNumber = createAsyncThunk<IOrderResponse, string>(
	'currentOrder/fetchOrderByNumber',
	async (orderNumber) => {
		const accessToken = localStorage.getItem('accessToken');

		const response = await fetchWithRefresh(`orders/${orderNumber}`, {
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
