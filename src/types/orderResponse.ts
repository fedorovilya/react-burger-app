import {ApiResponse} from "./apiResponse";

export interface OrderResponse extends ApiResponse {
	name: string,
	order: Order
}

export interface Order {
	number: number
}