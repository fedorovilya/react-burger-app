import {BASE_API_URL} from "../const/const";
import {ApiResponse} from "../types/apiResponse";

const checkResponse = <T extends ApiResponse>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
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
	return fetch(`${BASE_API_URL}${endpoint}`, options)
		.then((res) => checkResponse<T>(res))
		.then((data) => checkSuccess<T>(data));
};