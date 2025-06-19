import {NewOrderResponse} from "../../src/types/newOrderResponse";

export const orderMock: NewOrderResponse = {
	success: true,
	name: "Тестовый вкусный бургер",
	order: {
		number: 12345
	}
}
