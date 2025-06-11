import Cookies from 'js-cookie';
import { BASE_API_URL } from '../const/const';
import {
	removeUserFeedData,
	setUserFeedData,
} from '@services/slice/userFeedSlice';
import { removeFeedData, setFeedData } from '@services/slice/feedSlice';
import { Middleware } from '@reduxjs/toolkit';
import { FeedData } from '../types/feedData';
import { TokenResponse } from '../types/tokenResponse';
import { AuthError } from '@utils/request';

export const SOCKET_CONNECT = 'socket/connect';
export const SOCKET_DISCONNECT = 'socket/disconnect';

interface SocketConnectAction {
	type: typeof SOCKET_CONNECT;
	payload: {
		isPrivate: boolean;
		url: string;
	};
}

interface SocketDisconnectAction {
	type: typeof SOCKET_DISCONNECT;
}

export type SocketActionTypes = SocketConnectAction | SocketDisconnectAction;

function isSocketAction(action: unknown): action is SocketActionTypes {
	return (
		typeof action === 'object' &&
		action !== null &&
		'type' in action &&
		(action.type === SOCKET_CONNECT || action.type === SOCKET_DISCONNECT)
	);
}

const refreshToken = async () => {
	const BASE_API = process.env.BASE_API_URL || BASE_API_URL;
	const token = localStorage.getItem('refreshToken');
	const refreshTokenResponse: TokenResponse = await fetch(
		`${BASE_API}auth/token`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		}
	).then((r) => r.json());

	if (!refreshTokenResponse.success) {
		throw new AuthError('Не удалось обновить токены');
	}

	localStorage.setItem('refreshToken', refreshTokenResponse.refreshToken);
	Cookies.set('token', refreshTokenResponse.accessToken, {
		expires: 20 / (60 * 24),
	});
};

export const socketMiddleware: Middleware = (storeAPI) => {
	const RECONNECT_PERIOD = 3000;
	let socket: WebSocket | null = null;
	let isConnected = false;
	let reconnectId = 0;

	return (next) => (action) => {
		if (isSocketAction(action)) {
			if (action.type === SOCKET_CONNECT) {
				let { isPrivate, url } = action.payload;

				if (isPrivate) {
					const token = Cookies.get('token');
					if (token) {
						const cleanedToken = token.startsWith('Bearer ')
							? token.slice(7).trim()
							: token;
						url += `?token=${cleanedToken}`;
					} else {
						console.error('Токен не найден в cookie');
						return;
					}
				}

				socket = new WebSocket(url);

				socket.onopen = () => {
					isConnected = true;
					console.log('WebSocket connected');
				};

				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData: FeedData = JSON.parse(data);

						if (!isPrivate) {
							storeAPI.dispatch(setFeedData(parsedData));
						} else {
							if (
								parsedData?.message
									?.toLowerCase()
									.includes('Invalid or missing token'.toLowerCase())
							) {
								refreshToken().then(() =>
									storeAPI.dispatch({
										type: SOCKET_CONNECT,
										payload: { isPrivate, url },
									})
								);
							} else {
								storeAPI.dispatch(setUserFeedData(parsedData));
							}
						}
					} catch (error) {
						console.log(error);
						storeAPI.dispatch(removeUserFeedData());
						storeAPI.dispatch(removeFeedData());
					}
				};

				socket.onclose = () => {
					console.log('WebSocket disconnected');
					if (isConnected) {
						reconnectId = Number(
							setTimeout(() => {
								storeAPI.dispatch({
									type: SOCKET_CONNECT,
									payload: { isPrivate, url },
								});
							}, RECONNECT_PERIOD)
						);
					}
				};

				socket.onerror = (error) => {
					console.error('WebSocket error:', error);
				};
			}

			if (action.type === SOCKET_DISCONNECT) {
				clearTimeout(reconnectId);
				reconnectId = 0;
				isConnected = false;
				socket?.close();
				socket = null;

				return;
			}
		}
		return next(action);
	};
};
