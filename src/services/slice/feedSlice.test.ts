import { FeedOrder } from '../../types/feedOrder';
import { FeedData } from '../../types/feedData';
import feedSlice, {
	FeedState,
	initialState,
	removeFeedData,
	setFeedData,
} from '@services/slice/feedSlice';

describe('тесты feedSlice', () => {
	const mockOrder: FeedOrder = {
		_id: '6846e3bfc2f30c001cb2b1cd',
		ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
		status: 'done',
		name: 'Space флюоресцентный бургер',
		createdAt: '2025-06-09T13:38:07.865Z',
		updatedAt: '2025-06-09T13:38:08.702Z',
		number: 80693,
	};

	const mockFeedData: FeedData = {
		success: true,
		orders: [mockOrder],
		total: 10,
		totalToday: 5,
	};

	it('проверка initialState по умолчанию', () => {
		const actual = feedSlice(undefined, { type: '' });
		expect(actual).toEqual(initialState);
	});

	it('должен установить данные и изменить статус на "success" когда вызван setFeedData', () => {
		const actual = feedSlice(undefined, setFeedData(mockFeedData));
		expect(actual.data).toEqual(mockFeedData);
		expect(actual.status).toBe('success');
	});

	it('должен очистить данные и вернуть статус "idle" когда вызван removeFeedData', () => {
		const stateWithValues: FeedState = {
			data: mockFeedData,
			status: 'success',
		};

		const actual = feedSlice(stateWithValues, removeFeedData());
		expect(actual.data).toBeNull();
		expect(actual.status).toBe('idle');
	});
});
