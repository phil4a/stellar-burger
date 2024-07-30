import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	WebsocketStatus,
	IWebsocketOrder,
	IWebsocketResponse,
} from '../../../utils/websockets-types';

export interface IOrdersState {
	status: WebsocketStatus;
	profileOrders: IWebsocketOrder[];
	total: number;
	totalToday: number;
	connectionError: string | null;
}

const initialState: IOrdersState = {
	status: WebsocketStatus.OFFLINE,
	profileOrders: [],
	total: 0,
	totalToday: 0,
	connectionError: null,
};

export const profileOrdersSlice = createSlice({
	name: 'profileOrders',
	initialState,
	reducers: {
		profileWsConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},
		profileWsOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
			state.connectionError = null;
		},
		profileWsClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},
		profileWsError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload;
		},
		profileWsMessage: (state, action: PayloadAction<IWebsocketResponse>) => {
			const { orders, total, totalToday } = action.payload;
			state.profileOrders = orders;
			state.total = total;
			state.totalToday = totalToday;
		},
	},
	selectors: {
		getProfileOrders: (state) => state.profileOrders,
		getWebsocketStatus: (state) => state.status,
		getTotalOrders: (state) => state.total,
		getTotalTodayOrders: (state) => state.totalToday,
		getConnectionError: (state) => state.connectionError,
		getOrderById: (state, id) => state.profileOrders.find((order) => order._id === id),
	},
});

export const {
	profileWsConnecting,
	profileWsOpen,
	profileWsClose,
	profileWsError,
	profileWsMessage,
} = profileOrdersSlice.actions;
export const {
	getProfileOrders,
	getWebsocketStatus,
	getTotalOrders,
	getTotalTodayOrders,
	getConnectionError,
	getOrderById,
} = profileOrdersSlice.selectors;
