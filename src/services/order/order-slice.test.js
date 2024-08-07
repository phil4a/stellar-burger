import reducer, {
	initialState,
	clearCurrentOrder,
	sendOrder,
	fetchOrderByNumber,
} from './order-slice';
import { fetchWithRefresh } from '../../utils/api';

jest.mock('../../utils/api');

describe('Check order', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	test('should clear current order', () => {
		const previousState = {
			...initialState,
			orderNumber: 123456,
		};
		expect(reducer(previousState, clearCurrentOrder())).toEqual(initialState);
	});

	describe('send order', () => {
		test('should handle pending state', () => {
			const action = { type: sendOrder.pending.type };
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'loading',
				isSendingOrder: true,
			});
		});

		test('should handle fulfilled state', async () => {
			const orderResponse = { order: { number: 12345 } };
			const action = { type: sendOrder.fulfilled.type, payload: orderResponse };
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'succeeded',
				isSendingOrder: false,
				orderNumber: orderResponse.order.number,
			});
		});

		test('should handle rejected state', () => {
			const action = { type: sendOrder.rejected.type, error: { message: 'Network Error' } };
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'failed',
				isSendingOrder: false,
				error: 'Network Error',
			});
		});
	});

	describe('fetch order by number', () => {
		test('should handle pending state', () => {
			const action = { type: fetchOrderByNumber.pending.type };
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'loading',
			});
		});

		test('should handle fulfilled state', async () => {
			const orderResponse = { orders: [{ id: 1, name: 'order1' }] };
			const action = { type: fetchOrderByNumber.fulfilled.type, payload: orderResponse };
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'succeeded',
				recievedOrderByNumber: orderResponse.orders[0],
			});
		});

		test('should handle rejected state', () => {
			const action = {
				type: fetchOrderByNumber.rejected.type,
				error: { message: 'Network Error' },
			};
			const state = reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				status: 'failed',
				error: 'Network Error',
			});
		});
	});

	test('should dispatch sendOrder and update state', async () => {
		const mockDispatch = jest.fn();
		const mockGetState = jest.fn();
		const mockResponse = { orders: [] };

		fetchWithRefresh.mockResolvedValue(mockResponse);

		const thunk = sendOrder(['ingredient1', 'ingredient2']);
		await thunk(mockDispatch, mockGetState, {});

		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: sendOrder.pending.type }),
		);
		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: sendOrder.fulfilled.type, payload: mockResponse }),
		);
	});

	test('should dispatch fetchOrderByNumber and update state', async () => {
		const mockDispatch = jest.fn();
		const mockGetState = jest.fn();
		const mockResponse = { order: { number: 12345 } };

		fetchWithRefresh.mockResolvedValue(mockResponse);

		const thunk = fetchOrderByNumber('12345');
		await thunk(mockDispatch, mockGetState, {});

		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: fetchOrderByNumber.pending.type }),
		);
		expect(mockDispatch).toHaveBeenCalledWith(
			expect.objectContaining({ type: fetchOrderByNumber.fulfilled.type, payload: mockResponse }),
		);
	});
});
