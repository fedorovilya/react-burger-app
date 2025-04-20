import {BASE_API_URL} from "../const/const";

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
	return fetch(`${BASE_API_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};