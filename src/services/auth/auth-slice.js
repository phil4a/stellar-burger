import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithRefresh } from '../../utils/api';

const initialState = {
	user: {
		name: '',
		email: '',
	},
	isForgotPassword: false,
	isAuthChecked: false,
	status: 'idle',
	error: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setForgotPassword: (state, action) => {
			state.isForgotPassword = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuthChecked = true;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.isAuthChecked = false;
				state.error = action.error.message;
			});

		builder
			.addCase(registration.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const { accessToken, refreshToken } = action.payload;
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			})
			.addCase(registration.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
		builder
			.addCase(logout.fulfilled, (state, action) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				state.isAuthChecked = false;
				state.accessToken = null;
				state.refreshToken = null;
				state.status = 'idle';
				state.user = { name: '', email: '' };
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logout.pending, (state, action) => {
				state.status = 'loading';
			});
		builder
			.addCase(refreshUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuthChecked = true;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(refreshUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			});
		builder
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuthChecked = true;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoggedIn = false;
				state.error = action.error.message || 'Failed to authenticate';
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				state.accessToken = null;
				state.refreshToken = null;
			})
			.addCase(checkAuth.pending, (state, action) => {
				state.status = 'loading';
			});
	},
});

export const registration = createAsyncThunk('register/register', (data) => {
	const body = JSON.stringify({
		email: data.email,
		password: data.password,
		name: data.name,
	});
	return fetchWithRefresh('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
});

export const login = createAsyncThunk('auth/login', (data) => {
	const { accessToken, email, password } = data;
	const response = fetchWithRefresh('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
		},
		body: JSON.stringify({ email, password }),
	});
	return response;
});

export const logout = createAsyncThunk('auth/logout', () => {
	return fetchWithRefresh('auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
	const accessToken = localStorage.getItem('accessToken');
	if (!accessToken) {
		return Promise.reject('No access token available');
	}
	return fetchWithRefresh('auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
		},
	});
});

export const refreshUser = createAsyncThunk('auth/refresh', async (data) => {
	const accessToken = localStorage.getItem('accessToken');
	const body = JSON.stringify({
		email: data.email,
		name: data.name,
	});
	return fetchWithRefresh('auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
		},
		body,
	});
});

export const { setForgotPassword } = authSlice.actions;

export default authSlice.reducer;
