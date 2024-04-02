import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from './constants';

const initialState = {
	orderNumber: null,
	status: 'idle',
	error: null,
};

export const orderSlice = createSlice({
	name: 'currentOrder',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(sendOrder.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orderNumber = action.payload.order.number;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const sendOrder = createAsyncThunk('currentOrder/send', async (ingredientIds) => {
	const response = await fetch(`${API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
	if (!response.ok) {
		throw new Error('Ошибка сервера');
	}
	return await response.json();
});

export default orderSlice.reducer;

// const requestOrder = async (ingredientIds) => {
// 	const response = await fetch(`${API_URL}/orders`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({ ingredients: ingredientIds }),
// 	});
// 	if (!response.ok) {
// 		throw new Error('Ошибка сервера');
// 	}
// 	return await response.json();
// };

// const sendOrder = (ingredientIds) => {
// 	requestOrder(ingredientIds)
// 		.then((data) => {
// 			if (data.success) {
// 				setOrderNumber(data.order.number);
// 				handleOpenModal('orderDetails');
// 			} else {
// 				throw new Error('Ошибка получения заказа');
// 			}
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// };
