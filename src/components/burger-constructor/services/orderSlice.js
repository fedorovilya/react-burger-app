import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
	name: 'burgerConstructor',
	initialState: {
		orderId: null
	},
	reducers: {
		setOrderId: (state, action) => {
			state.orderId = action.payload;
		},
		detachOrderId: (state) => {
			state.orderId = null;
		},
	},
});

export const { setOrderId, detachOrderId } = orderSlice.actions;
export default orderSlice.reducer;
