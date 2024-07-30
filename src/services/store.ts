import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import currentIngredientSlice from './current-ingredient-slice';
import ingredientsSlice from './ingredients-slice';
import constructorSlice from './constructor-slice';
import orderSlice from './order-slice';
import {
	profileOrdersSlice,
	profileWsClose,
	profileWsConnecting,
	profileWsError,
	profileWsMessage,
	profileWsOpen,
} from './websockets/profile-feed/slice';

import {
	ordersSlice,
	wsClose,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from './websockets/order-feed/slice';

import authSlice from './auth/auth-slice';
import { socketMiddleware } from './websockets/middleware/socket-middleware';
import { wsConnect, wsDisconnect } from './websockets/order-feed/actions';
import { profileWsConnect, profileWsDisconnect } from './websockets/profile-feed/actions';

const ordersFeedMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage,
});

const profileFeedMiddleware = socketMiddleware({
	connect: profileWsConnect,
	disconnect: profileWsDisconnect,
	onConnecting: profileWsConnecting,
	onOpen: profileWsOpen,
	onClose: profileWsClose,
	onError: profileWsError,
	onMessage: profileWsMessage,
});

const rootReducer = combineReducers({
	currentIngredient: currentIngredientSlice,
	ingredients: ingredientsSlice,
	currentOrder: orderSlice,
	burgerConstructor: constructorSlice,
	auth: authSlice,
	[ordersSlice.reducerPath]: ordersSlice.reducer,
	[profileOrdersSlice.reducerPath]: profileOrdersSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(ordersFeedMiddleware).concat(profileFeedMiddleware);
	},
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
