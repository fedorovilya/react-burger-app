import {ApiResponse} from "./apiResponse";
import {FeedOrder} from "./feedOrder";

export interface FeedData extends ApiResponse {
	orders: FeedOrder[];
	total?: number;
	totalToday?: number;
}
