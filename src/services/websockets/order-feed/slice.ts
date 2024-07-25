import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebsocketStatus, IWebsocketOrder } from '../../../utils/websockets-types';

export interface OrdersState {
	status: WebsocketStatus;
	orders: IWebsocketOrder[];
	connectionError: string | null;
}

const initialState: OrdersState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	connectionError: null,
};

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		wsConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		wsOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.connectionError = null;
		},
		wsClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},
		wsError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload;
		},
		wsMessage: (state, action: PayloadAction<IWebsocketOrder>) => {
			state.orders.push(action.payload);
		},
	},
	selectors: {
		getOrders: (state) => state.orders,
		getWebsocketStatus: (state) => state.status,
	},
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = ordersSlice.actions;
export const { getOrders, getWebsocketStatus } = ordersSlice.selectors;
