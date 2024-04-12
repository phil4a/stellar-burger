import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';

const initialState = {
	user: {
		name: '',
		email: '',
	},
	isLoggedIn: false,
	status: 'idle',
	error: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoggedIn = true;
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});

		builder
			.addCase(refreshToken.pending, (state, action) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.accessToken = action.payload.accessToken;
				localStorage.setItem('accessToken', action.payload.accessToken);
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.status = 'failed';
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
	},
});

export const registration = createAsyncThunk('register/register', async (data) => {
	const body = JSON.stringify({
		email: data.email,
		password: data.password,
		name: data.name,
	});
	return await request('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
});

export const login = createAsyncThunk('auth/login', async (data) => {
	const { accessToken, email, password } = data;
	const response = await request('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken,
		},
		body: JSON.stringify({ email, password }),
	});
	return response;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
	const body = JSON.stringify({ token: refreshToken });
	const response = await request('auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
	return response;
});

export default authSlice.reducer;
