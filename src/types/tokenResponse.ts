import { ApiResponse } from './apiResponse';

export interface TokenResponse extends ApiResponse {
	accessToken: string;
	refreshToken: string;
}
