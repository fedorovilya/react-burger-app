import orderReducer, {
	clearOrder,
	setOrderInfo,
	createOrderRequest,
	getOrder,
	OrderData,
	initialState,
} from './orderSlice';
import { CreatedOrder } from '../../types/newOrderResponse';
import { FeedOrder } from '../../types/feedOrder'; // Обновите путь

jest.mock('@utils/request', () => ({
	request: jest.fn(),
}));

describe('тесты orderSlice', () => {
	const mockCreatedOrder: CreatedOrder = {
		number: 12345,
	};

	const mockFeedOrder: FeedOrder = {
		_id: '6847f515c2f30c001cb2b50c',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0943',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa0949',
			'643d69a5c3f7b9001cfa093c',
		],
		status: 'done',
		name: 'Экзо-плантаго краторный space бессмертный бургер',
		createdAt: '2025-06-10T09:04:21.059Z',
		updatedAt: '2025-06-10T09:04:21.873Z',
		number: 12345,
	};

	it('должен использовать initialState по умолчанию', () => {
		const actual = orderReducer(undefined, { type: '' });
		expect(actual).toEqual(initialState);
	});

	it('должен очистить заказ когда вызван clearOrder', () => {
		const stateWithValues: OrderData = {
			order: mockCreatedOrder,
			orderInfo: mockFeedOrder,
			status: 'success',
			error: null,
		};

		const actual = orderReducer(stateWithValues, clearOrder());
		expect(actual).toEqual(initialState);
	});

	it('должен установить orderInfo когда вызван setOrderInfo', () => {
		const actual = orderReducer(undefined, setOrderInfo(mockFeedOrder));
		expect(actual.orderInfo).toEqual(mockFeedOrder);
		expect(actual.status).toBe('idle');
	});

	it('должен установить status "loading" когда вызван createOrderRequest.pending', () => {
		const actual = orderReducer(
			undefined,
			createOrderRequest.pending('', undefined as any)
		);
		expect(actual.status).toBe('loading');
		expect(actual.error).toBeNull();
		expect(actual.order).toBeNull();
	});

	it('должен обработать успешное создание заказа когда вызван createOrderRequest.fulfilled', () => {
		const payload = {
			success: true,
			name: 'Экзо-плантаго краторный space бессмертный бургер',
			order: mockCreatedOrder,
		};

		const actual = orderReducer(
			undefined,
			createOrderRequest.fulfilled(payload, '', { ingredients: [] })
		);
		expect(actual.status).toBe('success');
		expect(actual.error).toBeNull();
		expect(actual.order).toEqual(mockCreatedOrder);
	});

	it('должен обработать ошибку когда вызван createOrderRequest.rejected', () => {
		const errorMessage = 'Ошибка сети';

		const actual = orderReducer(
			undefined,
			createOrderRequest.rejected(
				new Error(errorMessage),
				'',
				{ ingredients: [] },
				{
					message: errorMessage,
					name: 'unknown',
				}
			)
		);

		expect(actual.status).toBe('fail');
		expect(actual.error).toBe(errorMessage);
		expect(actual.order).toBeNull();
	});

	it('должен установить status "loading" когда вызван getOrder.pending', () => {
		const actual = orderReducer(undefined, getOrder.pending('', 12345));
		expect(actual.status).toBe('loading');
		expect(actual.error).toBeNull();
		expect(actual.orderInfo).toBeNull();
	});

	it('должен обработать успешное получение заказа когда вызван getOrder.fulfilled', () => {
		const payload = {
			success: true,
			orders: [mockFeedOrder],
			total: 100,
			totalToday: 10,
		};

		const actual = orderReducer(
			undefined,
			getOrder.fulfilled(payload, '', 12345)
		);
		expect(actual.status).toBe('success');
		expect(actual.error).toBeNull();
		expect(actual.orderInfo).toEqual(mockFeedOrder);
	});

	it('должен обработать ошибку когда вызван getOrder.rejected', () => {
		const errorMessage = 'Ошибка получения заказа';

		const actual = orderReducer(
			undefined,
			getOrder.rejected(new Error(errorMessage), '', 123, {
				message: errorMessage,
				name: 'unknown',
			})
		);

		expect(actual.status).toBe('fail');
		expect(actual.error).toBe(errorMessage);
		expect(actual.orderInfo).toBeNull();
	});
});
