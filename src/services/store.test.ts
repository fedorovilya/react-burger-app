import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '@services/slice/burgerIngredientsSlice';
import selectedIngredientReducer from '@services/slice/selectedIngredientSlice';
import burgerConstructorReducer, {
	addIngredientToConstructor,
} from '@services/slice/burgerConstructorSlice';
import orderReducer from '@services/slice/orderSlice';
import userReducer, { createLoginRequest } from '@services/slice/userSlice';
import feedReducer from '@services/slice/feedSlice';
import userFeedReducer from '@services/slice/userFeedSlice';
import { RootState } from '@services/store';

describe('Root Store', () => {
	let store: ReturnType<typeof configureStore>;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				ingredients: burgerIngredientsReducer,
				selectedIngredient: selectedIngredientReducer,
				burgerConstructor: burgerConstructorReducer,
				order: orderReducer,
				user: userReducer,
				feed: feedReducer,
				userFeed: userFeedReducer,
			},
		});
	});

	it('должен вернуть начальное состояние всех слайсов', () => {
		const state = store.getState() as RootState;

		expect(state.ingredients).toEqual({
			status: 'idle',
			error: null,
			ingredients: [],
		});

		expect(state.selectedIngredient).toEqual({
			selectedIngredient: null,
		});

		expect(state.burgerConstructor).toEqual({
			bun: null,
			ingredients: [],
		});

		expect(state.order).toEqual({
			order: null,
			orderInfo: null,
			status: 'idle',
			error: null,
		});

		expect(state.user).toEqual({
			user: null,
			status: 'idle',
			error: null,
			isAuthorized: false,
		});

		expect(state.feed).toEqual({
			data: null,
			status: 'idle',
		});

		expect(state.userFeed).toEqual({
			data: null,
			status: 'idle',
		});
	});

	it('должен обработать dispatch экшена burgerConstructor/addIngredientToConstructor', () => {
		const ingredient = {
			id: '1',
			item: {
				_id: '643d69a5c3f7b9001cfa093e',
				name: 'Филе Люминесцентного тетраодонтимформа',
				type: 'main',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/meat-03.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
				__v: 0,
			},
		};

		store.dispatch(addIngredientToConstructor(ingredient));
		const state = store.getState() as RootState;

		expect(state.burgerConstructor.ingredients).toHaveLength(1);
		expect(state.burgerConstructor.ingredients[0]).toEqual(ingredient);
	});

	it('должен обработать dispatch экшена user/createLoginRequest.fulfilled', () => {
		const payload = {
			success: true,
			user: {
				email: 'test@example.com',
				name: 'Test User',
			},
			accessToken: 'mockAccessToken',
			refreshToken: 'mockRefreshToken',
		};

		store.dispatch(
			createLoginRequest.fulfilled(payload, '', {
				email: 'test@example.com',
				password: '12345',
			})
		);
		const state = store.getState() as RootState;

		expect(state.user.status).toBe('success');
		expect(state.user.user).toEqual(payload.user);
		expect(state.user.isAuthorized).toBe(true);
	});
});
