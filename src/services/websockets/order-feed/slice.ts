import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	WebsocketStatus,
	IWebsocketOrder,
	IWebsocketResponse,
} from '../../../utils/websockets-types';

export interface IOrdersState {
	status: WebsocketStatus;
	orders: IWebsocketOrder[];
	total: number;
	totalToday: number;
	connectionError: string | null;
}

const initialState: IOrdersState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: 0,
	totalToday: 0,
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
		wsMessage: (state, action: PayloadAction<IWebsocketResponse>) => {
			const { orders, total, totalToday } = action.payload;
			state.orders = orders;
			state.total = total;
			state.totalToday = totalToday;
		},
	},
	selectors: {
		getOrders: (state) => state.orders,
		getWebsocketStatus: (state) => state.status,
		getTotalOrders: (state) => state.total,
		getTotalTodayOrders: (state) => state.totalToday,
		getConnectionError: (state) => state.connectionError,
		getOrderById: (state, id) => state.orders.find((order) => order._id === id),
	},
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = ordersSlice.actions;
export const {
	getOrders,
	getWebsocketStatus,
	getTotalOrders,
	getTotalTodayOrders,
	getConnectionError,
	getOrderById,
} = ordersSlice.selectors;
