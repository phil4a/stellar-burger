import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
};

export const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(authorization.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(authorization.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('refreshToken', action.payload.refreshToken);
			})
			.addCase(authorization.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});

		builder
			.addCase(refreshToken.pending, (state, action) => {
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
	},
});

export const authorization = createAsyncThunk('auth/authorization', async (data) => {
	const body = JSON.stringify(data);
	const response = await request('auth/login', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${data.accessToken}`,
			'Content-Type': 'application/json',
		},
		body,
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

export default authorizationSlice.reducer;
