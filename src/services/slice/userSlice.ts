import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {request} from "@utils/request";
import {RegisterRequest} from "../../types/registerRequest";
import {LoginRequest} from "../../types/loginRequest";
import {User, UserResponse} from "../../types/userResponse";
import {ApiResponse} from "../../types/apiResponse";
import {LogoutRequest} from "../../types/logoutRequest";

export interface UserData {
	status: 'idle' | 'loading' | 'success' | 'fail',
	error: string | null,
	user: User | null,
	accessToken: string | null,
	refreshToken: string | null,
	isAuthorized: boolean
}

const initialState: UserData = {
	user: null,
	status: 'idle',
	error: null,
	accessToken: null,
	refreshToken: localStorage.getItem("refreshToken") || null,
	isAuthorized: false
}

export const createRegisterRequest = createAsyncThunk<UserResponse, RegisterRequest>(
	'user/createRegisterRequest',
	async (registerData, thunkAPI) => {
		try {
			const response: UserResponse = await request('auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(registerData),
			});
			if (!response.user || !response.accessToken || !response.refreshToken) {
				return thunkAPI.rejectWithValue("Данные для успешной регистрации не получены в ответе")
			}
			return response;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка регистрации: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

export const createLoginRequest = createAsyncThunk<UserResponse, LoginRequest>(
	'user/createLoginRequest',
	async (loginData, thunkAPI) => {
		try {
			const response: UserResponse = await request('auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});
			if (!response.user || !response.accessToken || !response.refreshToken) {
				return thunkAPI.rejectWithValue("Данные для успешной авторизации не получены в ответе")
			}
			return response;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка авторизации: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

export const createLogoutRequest = createAsyncThunk<ApiResponse, LogoutRequest>(
	'user/createLogoutRequest',
	async (logoutData, thunkAPI) => {
		try {
			return await request('auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(logoutData),
			});
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка выхода из приложения: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue(errorMessage);
		}
	}
);

const handlePending = (state: UserData) => {
	state.status = 'loading';
	state.error = null;
};

const handleFulfilled = (state: UserData, action: PayloadAction<UserResponse>) => {
	const {user, accessToken, refreshToken} = action.payload;

	state.status = 'success';
	state.error = null;
	state.user = user as User;
	state.accessToken = accessToken as string;
	state.isAuthorized = true;

	localStorage.setItem('refreshToken', refreshToken as string);
};

const handleRejected = (state: UserData, action: any) => {
	state.status = 'fail';
	state.error = action.payload as string;
	state.user = null;
	state.accessToken = null;
	state.refreshToken = null;
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createRegisterRequest.pending, handlePending)
			.addCase(createLoginRequest.pending, handlePending)
			.addCase(createRegisterRequest.fulfilled, handleFulfilled)
			.addCase(createLoginRequest.fulfilled, handleFulfilled)
			.addCase(createRegisterRequest.rejected, handleRejected)
			.addCase(createLoginRequest.rejected, handleRejected)
			.addCase(createLogoutRequest.pending, handlePending)
			.addCase(createLogoutRequest.rejected, handleRejected)
			.addCase(createLogoutRequest.fulfilled, () => {
				localStorage.clear()
				return initialState;
			})
	}
});

export default userSlice.reducer;