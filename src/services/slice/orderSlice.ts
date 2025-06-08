import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {request} from '@utils/request';
import {CreatedOrder, NewOrderResponse} from '../../types/newOrderResponse';
import {OrderRequest} from '../../types/orderRequest';
import {FeedData} from "../../types/feedData";
import {FeedOrder} from "../../types/feedOrder";

export interface OrderData {
	status: 'idle' | 'loading' | 'success' | 'fail';
	error: string | null;
	order: CreatedOrder | null;
	orderInfo: FeedOrder | null
}

const initialState: OrderData = {
	order: null,
	orderInfo: null,
	status: 'idle',
	error: null,
};

export const createOrderRequest = createAsyncThunk<NewOrderResponse, OrderRequest>(
	'order/createOrderRequest',
	async (orderItems, thunkAPI) => {
		try {
			return (await request('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderItems),
			})) as NewOrderResponse;
		} catch (error: any) {
			if (error?.name === 'AuthError') {
				return thunkAPI.rejectWithValue({
					message: error.message,
					name: 'AuthError',
				});
			}
			const errorMessage = error.message
				? `Ошибка создания заказа: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({
				message: errorMessage,
				name: 'unknown',
			});
		}
	}
);

export const getOrder = createAsyncThunk<FeedData, number>(
	'order/getOrder',
	async (orderNumber, thunkAPI) => {
		try {
			return (await request(`orders/${orderNumber}`)) as FeedData;
		} catch (error: any) {
			if (error?.name === 'AuthError') {
				return thunkAPI.rejectWithValue({
					message: error.message,
					name: 'AuthError',
				});
			}
			const errorMessage = error.message
				? `Ошибка получения заказа: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({
				message: errorMessage,
				name: 'unknown',
			});
		}
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		clearOrder: () => {
			return initialState;
		},
		setOrderInfo: (state, action) => {
			state.orderInfo = action.payload;
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
			.addCase(createOrderRequest.rejected, (state, action: any) => {
				state.error = action.payload.message;
				state.status = 'fail';
			})
			.addCase(getOrder.pending, (state) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.error = null;
				state.status = 'success';
				state.orderInfo = action.payload.orders[0];
			})
			.addCase(getOrder.rejected, (state, action: any) => {
				state.error = action.payload.message;
				state.status = 'fail';
			});
	},
});

export const {clearOrder, setOrderInfo} = orderSlice.actions;
export default orderSlice.reducer;
