import {ApiResponse} from "./apiResponse";

export interface UserResponse extends ApiResponse {
	"accessToken"?: string,
	"refreshToken"?: string,
	"user": User
}

export interface User {
	email: string,
	name: string
}
