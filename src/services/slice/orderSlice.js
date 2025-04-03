import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {request} from "@utils/request";

export const createOrderRequest = createAsyncThunk(
	'order/createOrderRequest',
	async (orderItems, thunkAPI) => {
		try {
			return await request('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderItems),
			});
		} catch (error) {
			const errorMessage = error.message || error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		order: null,
		status: 'idle', // 'idle' | 'loading' | 'success' | 'fail'
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrderRequest.pending, (state) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(createOrderRequest.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'success';
				state.order = action.payload.order;
			})
			.addCase(createOrderRequest.rejected, (state, action) => {
				state.error = `Ошибка создания заказа: ${action.payload}`;
				state.status = 'fail';
				state.ingredients = null;
			});
	},
});

export default orderSlice.reducer;
