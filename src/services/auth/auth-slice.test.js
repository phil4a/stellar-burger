import reducer, {
	initialState,
	setForgotPassword,
	login,
	registration,
	logout,
	refreshUser,
	checkAuth,
} from './auth-slice';
import { fetchWithRefresh } from '../../utils/api';

jest.mock('../../utils/api', () => ({
	fetchWithRefresh: jest.fn(),
}));

const mockUser = {
	name: 'Test User',
	email: 'test@example.com',
};

const regResponse = {
	accessToken: 'access-token',
	refreshToken: 'refresh-token',
};

const mockResponse = {
	accessToken: 'access-token',
	refreshToken: 'refresh-token',
	user: mockUser,
};

const errorMessage = 'Failed to authenticate';

let localStorageMock = (() => {
	let store = {};
	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => {
			store[key] = value;
		},
		removeItem: (key) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
});

describe('Check auth', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	test('should set forgotPassword correctly', () => {
		const state = reducer(initialState, setForgotPassword(true));
		expect(state.isForgotPassword).toBe(true);
		expect(localStorageMock.getItem('isForgotPassword')).toBe(state.isForgotPassword.toString());
	});

	describe('login', () => {
		test('should handle login.pending correctly', () => {
			const state = reducer(initialState, login.pending());
			expect(state.status).toBe('loading');
			expect(state.isFetchingUser).toBe(true);
		});
		test('should handle login.fulfilled correctly', () => {
			fetchWithRefresh.mockResolvedValue(mockResponse);
			const action = { type: login.fulfilled.type, payload: mockResponse };
			const state = reducer(initialState, action);
			expect(state.status).toBe('succeeded');
			expect(state.isFetchingUser).toBe(false);
			expect(state.user).toEqual(mockUser);
			expect(localStorageMock.getItem('accessToken')).toBe(mockResponse.accessToken);
			expect(localStorageMock.getItem('refreshToken')).toBe(mockResponse.refreshToken);
		});
		test('should handle login.rejected correctly', () => {
			fetchWithRefresh.mockRejectedValue(new Error(errorMessage));
			const action = { type: login.rejected.type, error: new Error(errorMessage) };
			const state = reducer(initialState, action);
			expect(state.status).toBe('failed');
			expect(state.isFetchingUser).toBe(false);
			expect(state.error).toEqual(errorMessage);
		});
	});

	describe('registration', () => {
		test('should handle registration.pending correctly', () => {
			const state = reducer(initialState, registration.pending());
			expect(state.status).toBe('loading');
			expect(state.isFetchingUser).toBe(true);
		});
		test('should handle registration.fulfilled correctly', () => {
			const action = { type: registration.fulfilled.type, payload: regResponse };
			const state = reducer(initialState, action);
			expect(state.status).toBe('succeeded');
			expect(state.isFetchingUser).toBe(false);
			expect(localStorageMock.getItem('accessToken')).toBe(regResponse.accessToken);
			expect(localStorageMock.getItem('refreshToken')).toBe(regResponse.refreshToken);
		});
		test('should handle registration.rejected correctly', () => {
			const action = { type: registration.rejected.type, error: new Error(errorMessage) };
			const state = reducer(initialState, action);
			expect(state.status).toBe('failed');
			expect(state.isFetchingUser).toBe(false);
			expect(state.error).toEqual(errorMessage);
		});
	});

	describe('logout', () => {
		test('should handle logout.pending correctly', () => {
			const state = reducer(initialState, logout.pending());
			expect(state.status).toBe('loading');
			expect(state.isFetchingUser).toBe(true);
		});
		test('should handle logout.fulfilled correctly', () => {
			const action = { type: logout.fulfilled.type };
			const state = reducer(initialState, action);
			expect(state.status).toBe('idle');
			expect(state.isFetchingUser).toBe(false);
			expect(localStorageMock.getItem('accessToken')).toBe(null);
			expect(localStorageMock.getItem('refreshToken')).toBe(null);
			expect(state.user.name).toEqual('');
			expect(state.user.email).toEqual('');
		});
		test('should handle logout.rejected correctly', () => {
			const action = { type: logout.rejected.type, error: new Error(errorMessage) };
			const state = reducer(initialState, action);
			expect(state.status).toBe('failed');
			expect(state.isFetchingUser).toBe(false);
			expect(state.error).toEqual(errorMessage);
		});
	});

	describe('refreshUser', () => {
		test('should handle refreshUser.pending correctly', () => {
			const state = reducer(initialState, refreshUser.pending());
			expect(state.status).toBe('loading');
			expect(state.isFetchingUser).toBe(true);
		});

		test('should handle refreshUser.fulfilled correctly', () => {
			fetchWithRefresh.mockResolvedValue(mockResponse);
			const action = { type: refreshUser.fulfilled.type, payload: mockResponse };
			const state = reducer(initialState, action);
			expect(state.status).toBe('succeeded');
			expect(state.isFetchingUser).toBe(false);
			expect(state.user).toEqual(mockUser);
			expect(state.accessToken).toEqual(mockResponse.accessToken);
			expect(state.refreshToken).toEqual(mockResponse.refreshToken);
		});

		test('should handle refreshUser.rejected correctly', () => {
			fetchWithRefresh.mockRejectedValue(new Error(errorMessage));
			const action = { type: refreshUser.rejected.type, error: new Error(errorMessage) };
			const state = reducer(initialState, action);
			expect(state.status).toBe('failed');
			expect(state.isFetchingUser).toBe(false);
			expect(state.error).toEqual(errorMessage);
			expect(localStorageMock.getItem('accessToken')).toEqual(null);
			expect(localStorageMock.getItem('refreshToken')).toEqual(null);
		});
	});

	describe('checkAuth', () => {
		test('should handle checkAuth.pending correctly', () => {
			const state = reducer(initialState, checkAuth.pending());
			expect(state.status).toBe('loading');
			expect(state.isFetchingUser).toBe(true);
		});

		test('should handle checkAuth.fulfilled correctly', () => {
			const action = { type: checkAuth.fulfilled.type, payload: mockResponse };
			const state = reducer(initialState, action);
			expect(state.status).toBe('succeeded');
			expect(state.isFetchingUser).toBe(false);
			expect(state.user).toEqual(mockUser);
		});

		test('should handle checkAuth.rejected correctly', () => {
			const action = { type: checkAuth.rejected.type, error: new Error(errorMessage) };
			const state = reducer(initialState, action);
			expect(state.status).toBe('failed');
			expect(state.isFetchingUser).toBe(false);
			expect(state.error).toEqual(errorMessage);
			expect(state.accessToken).toEqual(null);
			expect(state.refreshToken).toEqual(null);
		});
	});
});
