import { createSlice } from '@reduxjs/toolkit';
import { FeedData } from '../../types/feedData';

export type UserFeedState = {
	data: FeedData | null;
	status: 'idle' | 'loading' | 'success' | 'fail';
};

export const initialState: UserFeedState = {
	data: null,
	status: 'idle',
};

const userFeedSlice = createSlice({
	name: 'userFeed',
	initialState,
	reducers: {
		setUserFeedData(state, action) {
			state.data = action.payload;
			state.status = 'success';
		},
		removeUserFeedData(state) {
			state.data = null;
			state.status = 'idle';
		},
	},
});

export const { setUserFeedData, removeUserFeedData } = userFeedSlice.actions;

export default userFeedSlice.reducer;
