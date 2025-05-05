import {BASE_API_URL} from "../const/const";
import {ApiResponse} from "../types/apiResponse";
import Cookies from "js-cookie";
import {TokenResponse} from "../types/tokenResponse";

export class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthError";
	}
}

const checkResponse = async <T extends ApiResponse>(
	res: Response,
	endpoint: string,
	options: RequestInit
): Promise<T> => {
	if (res.ok) {
		return res.json();
	}
	// Если не авторизован
	if (res.status === 401) {
		const token = localStorage.getItem("refreshToken");

		if (!token) {
			throw new Error("Нет refresh токена");
		}

		try {
			// Обновляем токены
			const refreshTokenResponse: TokenResponse = await fetch(`${BASE_API_URL}/auth/token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({token}),
			}).then((r) => r.json());

			if (!refreshTokenResponse.success) {
				throw new Error("Не удалось обновить токены");
			}

			// Сохраняем новые токены
			localStorage.setItem("refreshToken", refreshTokenResponse.refreshToken);
			Cookies.set("token", refreshTokenResponse.accessToken, {expires: 20 / (60 * 24)});

			// Добавляем новый accessToken в заголовки
			const authHeaders = {
				...options.headers,
				Authorization: `${Cookies.get("token")}`,
			};

			// Повторяем исходный запрос
			const retryRes = await fetch(`${BASE_API_URL}${endpoint}`, {
				...options,
				headers: authHeaders,
			});

			return checkSuccess(await retryRes.json());
		} catch (e) {
			// Если refresh токен тоже истёк — завершаем сессию
			throw new AuthError("Сессия истекла");
		}
	}

	throw new Error(`Ошибка ${res.status}`);
};

const checkSuccess = <T extends ApiResponse>(res: T): T => {
	if (res && res.success) {
		return res;
	}
	throw new Error(`Ответ не success: ${res}`);
};

export const request = <T extends ApiResponse>(
	endpoint: string,
	options: RequestInit
): Promise<T> => {
	let token = Cookies.get("token");
	if (token) {
		options = {
			...options,
			headers: {
				...options.headers,
				Authorization: `${Cookies.get("token")}`,
			}
		}
	}
	return fetch(`${BASE_API_URL}${endpoint}`, options)
		.then((res) => checkResponse<T>(res, endpoint, options))
		.then((data) => checkSuccess<T>(data));
};
