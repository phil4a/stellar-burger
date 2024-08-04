import reducer, { initialState, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './slice';

const wsMessageResponseMock = {
	orders: [
		{ id: 1, name: 'Order 1' },
		{ id: 2, name: 'Order 2' },
	],
	total: 100,
	totalToday: 10,
};

describe('ordersSlice reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	test('should handle wsConnecting', () => {
		const state = reducer(initialState, wsConnecting());
		expect(state).toEqual({
			...initialState,
			status: 'CONNECTING...',
		});
	});

	test('should handle wsOpen', () => {
		const state = reducer(initialState, wsOpen());
		expect(state).toEqual({
			...initialState,
			status: 'ONLINE',
		});
	});

	test('should handle wsClose', () => {
		const state = reducer(initialState, wsClose());
		expect(state).toEqual({
			...initialState,
			status: 'OFFLINE',
		});
	});

	test('should handle wsError', () => {
		const errorMessage = 'Connection failed';
		const state = reducer(initialState, wsError(errorMessage));
		expect(state).toEqual({
			...initialState,
			connectionError: errorMessage,
		});
	});

	test('should handle wsMessage', () => {
		const state = reducer(initialState, wsMessage(wsMessageResponseMock));
		expect(state).toEqual({
			...initialState,
			orders: wsMessageResponseMock.orders,
			total: wsMessageResponseMock.total,
			totalToday: wsMessageResponseMock.totalToday,
		});
	});
});
