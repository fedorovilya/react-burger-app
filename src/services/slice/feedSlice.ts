import { createSlice } from '@reduxjs/toolkit';
import { FeedData } from '../../types/feedData';

export type FeedState = {
	data: FeedData | null;
	status: 'idle' | 'loading' | 'success' | 'fail';
};

export const initialState: FeedState = {
	data: null,
	status: 'idle',
};

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		setFeedData(state, action) {
			state.data = action.payload;
			state.status = 'success';
		},
		removeFeedData(state) {
			state.data = null;
			state.status = 'idle';
		},
	},
});

export const { setFeedData, removeFeedData } = feedSlice.actions;

export default feedSlice.reducer;
