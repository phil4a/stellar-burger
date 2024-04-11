import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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

export const registration = createAsyncThunk('register/registration', async (data) => {
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

export default registerSlice.reducer;
