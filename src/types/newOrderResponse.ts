import { ApiResponse } from './apiResponse';

export interface NewOrderResponse extends ApiResponse {
	name: string;
	order: CreatedOrder;
}

export interface CreatedOrder {
	number: number;
}
