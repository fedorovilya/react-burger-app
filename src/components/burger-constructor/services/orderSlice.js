import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_CREATE_ORDER_ENDPOINT } from '../../../const/const';

export const createOrderRequest = createAsyncThunk(
	'order/createOrderRequest',
	async (orderItems, thunkAPI) => {
		try {
			const response = await fetch(API_CREATE_ORDER_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderItems),
			});

			let json = await response.json();
			if (!json.success) {
				throw new Error(
					`Удаленный сервер вернул ошибку: ${json.message}, status:${json.success}`
				);
			}
			return json;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.message || 'Ошибка создания заказа'
			);
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
	reducers: {
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		detachOrder: (state) => {
			state.order = null;
		},
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
				state.error = action.payload || 'Ошибка создания заказа';
				state.status = 'fail';
				state.ingredients = null;
			});
	},
});

export default orderSlice.reducer;
