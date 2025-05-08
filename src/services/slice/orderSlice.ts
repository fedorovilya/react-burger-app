import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthError, request} from "@utils/request";
import {Order, OrderResponse} from "../../types/orderResponse";
import {OrderRequest} from "../../types/orderRequest";

export interface OrderData {
	status: 'idle' | 'loading' | 'success' | 'fail',
	error: string | null,
	order: Order | null
}

const initialState: OrderData = {
	order: null,
	status: 'idle',
	error: null,
}

export const createOrderRequest = createAsyncThunk<OrderResponse, OrderRequest>(
	'order/createOrderRequest',
	async (orderItems, thunkAPI) => {
		try {
			return await request('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderItems),
			}) as OrderResponse;
		} catch (error: any) {
			if (error?.name === "AuthError") {
				return thunkAPI.rejectWithValue({message: error.message, name: "AuthError"});
			}
			const errorMessage = error.message
				? `Ошибка создания заказа: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
		}
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		clearOrder: () => {
			return initialState
		}
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
			.addCase(createOrderRequest.rejected, (state, action: any) => {
				state.error = action.payload.message;
				state.status = 'fail';
			});
	},
});

export const {clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
