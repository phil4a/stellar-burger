import reducer, {
	initialState,
	profileWsConnecting,
	profileWsOpen,
	profileWsClose,
	profileWsError,
	profileWsMessage,
} from './profile-slice';

const wsMessageResponseMock = {
	orders: [
		{ id: 1, name: 'Order 3' },
		{ id: 2, name: 'Order 4' },
	],
	total: 100,
	totalToday: 10,
};

describe('profileSlice reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	test('should handle profileWsConnecting', () => {
		const state = reducer(initialState, profileWsConnecting());
		expect(state).toEqual({
			...initialState,
			status: 'CONNECTING...',
		});
	});

	test('should handle profileWsOpen', () => {
		const state = reducer(initialState, profileWsOpen());
		expect(state).toEqual({
			...initialState,
			status: 'ONLINE',
		});
	});

	test('should handle profileWsClose', () => {
		const state = reducer(initialState, profileWsClose());
		expect(state).toEqual({
			...initialState,
			status: 'OFFLINE',
		});
	});

	test('should handle profileWsError', () => {
		const errorMessage = 'Connection failed';
		const state = reducer(initialState, profileWsError(errorMessage));
		expect(state).toEqual({
			...initialState,
			connectionError: errorMessage,
		});
	});

	test('should handle profileWsMessage', () => {
		const state = reducer(initialState, profileWsMessage(wsMessageResponseMock));
		expect(state).toEqual({
			...initialState,
			profileOrders: wsMessageResponseMock.orders,
			total: wsMessageResponseMock.total,
			totalToday: wsMessageResponseMock.totalToday,
		});
	});
});
