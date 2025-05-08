import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {request} from "@utils/request";
import {RegisterRequest} from "../../types/registerRequest";
import {LoginRequest} from "../../types/loginRequest";
import {User, UserResponse} from "../../types/userResponse";
import {ApiResponse} from "../../types/apiResponse";
import {LogoutRequest} from "../../types/logoutRequest";
import Cookies from "js-cookie";
import {UpdateUserRequest} from "../../types/updateUserRequest";

export interface UserData {
	status: 'idle' | 'loading' | 'success' | 'fail',
	error: string | null,
	user: User | null,
	isAuthorized: boolean
}

const initialState: UserData = {
	user: null,
	status: 'idle',
	error: null,
	isAuthorized: !!(localStorage.getItem("refreshToken") && Cookies.get("token"))
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

			localStorage.setItem('refreshToken', response.refreshToken as string);
			Cookies.set("token", response.accessToken as string, {expires: 20 / (60 * 24)});

			return response;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка регистрации: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
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

			localStorage.setItem('refreshToken', response.refreshToken as string);
			Cookies.set("token", response.accessToken as string, {expires: 20 / (60 * 24)});

			return response;
		} catch (error: any) {
			if (error.name === "AuthError") {
				return thunkAPI.rejectWithValue({message: error.message, name: error.name});
			}
			const errorMessage = error.message
				? `Ошибка авторизации: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
		}
	}
);

export const createLogoutRequest = createAsyncThunk<ApiResponse, LogoutRequest>(
	'user/createLogoutRequest',
	async (logoutData, thunkAPI) => {
		try {
			let response = await request('auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(logoutData),
			});

			localStorage.clear();
			Cookies.remove("token");

			return response;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка выхода из приложения: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
		}
	}
);

export const createGetUserRequest = createAsyncThunk<UserResponse>(
	'user/createGetUserRequest',
	async (_, thunkAPI) => {
		try {
			return await request('auth/user') as UserResponse;
		} catch (error: any) {
			if (error.name === "AuthError") {
				return thunkAPI.rejectWithValue({message: error.message, name: error.name});
			}
			const errorMessage = error.message
				? `Ошибка получения пользователя: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
		}
	}
);

export const createUpdateUserRequest = createAsyncThunk<UserResponse, UpdateUserRequest>(
	'user/createUpdateUserRequest',
	async (userData, thunkAPI) => {
		try {
			return await request('auth/user', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			}) as UserResponse;
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка выхода из приложения: ${error.message}`
				: error.toString() || 'Неожиданная ошибка';
			return thunkAPI.rejectWithValue({message: errorMessage, name: "unknown"});
		}
	}
);

const handlePending = (state: UserData) => {
	state.status = 'loading';
	state.error = null;
};

const handleFulfilled = (state: UserData, action: PayloadAction<UserResponse>) => {
	const {user} = action.payload;

	state.status = 'success';
	state.error = null;
	state.user = user as User;
	state.isAuthorized = true;
};

const handleRejected = (state: UserData, action: any) => {
	state.status = 'fail';
	state.error = action.payload.message;
	state.user = null;
	if (action.payload.name === "AuthError") {
		state.isAuthorized = false;
	}
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
				return {
					user: null,
					status: 'idle',
					error: null,
					isAuthorized: false
				}
			})
			.addCase(createGetUserRequest.pending, handlePending)
			.addCase(createGetUserRequest.rejected, handleRejected)
			.addCase(createGetUserRequest.fulfilled, handleFulfilled)
			.addCase(createUpdateUserRequest.pending, handlePending)
			.addCase(createUpdateUserRequest.rejected, handleRejected)
			.addCase(createUpdateUserRequest.fulfilled, handleFulfilled)
	}
});

export default userSlice.reducer;
