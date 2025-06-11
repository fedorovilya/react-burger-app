import {Ingredient} from "../../types/ingredientsResponse";
import burgerIngredientsSlice, {fetchIngredients, initialState} from "@services/slice/burgerIngredientsSlice";

jest.mock('@utils/request', () => ({
	request: jest.fn()
}));

describe('тесты burgerIngredientsSlice', () => {
	const bunMock: Ingredient = {
		"_id": "643d69a5c3f7b9001cfa093c",
		"name": "Краторная булка N-200i",
		"type": "bun",
		"proteins": 80,
		"fat": 24,
		"carbohydrates": 53,
		"calories": 420,
		"price": 1255,
		"image": "https://code.s3.yandex.net/react/code/bun-02.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
		"__v": 0
	};

	const ingredientMock: Ingredient = {
		"_id": "643d69a5c3f7b9001cfa093e",
		"name": "Филе Люминесцентного тетраодонтимформа",
		"type": "main",
		"proteins": 44,
		"fat": 26,
		"carbohydrates": 85,
		"calories": 643,
		"price": 988,
		"image": "https://code.s3.yandex.net/react/code/meat-03.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
		"__v": 0
	};

	it('проверка initialState по умолчанию', () => {
		const actual = burgerIngredientsSlice(undefined, {type: ''});
		expect(actual).toEqual(initialState);
	});

	it('должен установить status "loading" когда вызван fetchIngredients.pending', () => {
		const actual = burgerIngredientsSlice(undefined, fetchIngredients.pending('', undefined));
		expect(actual.status).toBe('loading');
		expect(actual.error).toBeNull();
		expect(actual.ingredients).toEqual([]);
	});

	it('должен обработать успешную загрузку когда вызван fetchIngredients.fulfilled', () => {
		const payload = {
			success: true,
			data: [ingredientMock, bunMock]
		};

		const actual = burgerIngredientsSlice(undefined, fetchIngredients.fulfilled(payload, '', undefined));
		expect(actual.status).toBe('success');
		expect(actual.error).toBeNull();
		expect(actual.ingredients).toEqual([ingredientMock, bunMock]);
	});

	it('должен сохранить ошибку когда вызван fetchIngredients.rejected', () => {
		const errorMessage = 'Connection error';

		const actual = burgerIngredientsSlice(
			undefined,
			fetchIngredients.rejected(new Error(errorMessage), '', undefined, errorMessage)
		);

		expect(actual.status).toBe('fail');
		expect(actual.error).toBe(errorMessage);
		expect(actual.ingredients).toEqual([]);
	});
});
