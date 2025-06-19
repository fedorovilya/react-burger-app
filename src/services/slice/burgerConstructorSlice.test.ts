import { Ingredient } from '../../types/ingredientsResponse';
import { ConstructorItem } from '../../types/constructorItem';
import burgerConstructorSlice, {
	addIngredientToConstructor,
	clearList,
	initialState,
	removeIngredientFromConstructor,
	setBun,
	setIngredientsConstructorList,
} from '@services/slice/burgerConstructorSlice';

describe('тесты burgerConstructorSlice', () => {
	const bunMock: Ingredient = {
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	};

	const ingredientMock: ConstructorItem = {
		id: 'ingredient-1',
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
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
			__v: 0,
		},
	};

	const anotherIngredientMock: ConstructorItem = {
		id: 'ingredient-2',
		item: {
			_id: '643d69a5c3f7b9001cfa0942',
			name: 'Соус Spicy-X',
			type: 'sauce',
			proteins: 30,
			fat: 20,
			carbohydrates: 40,
			calories: 30,
			price: 90,
			image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
			__v: 0,
		},
	};

	it('проверка initialState по умолчанию', () => {
		const actual = burgerConstructorSlice(undefined, { type: '' });
		expect(actual).toEqual(initialState);
	});

	it('должен успешно добавить булку в конструктор', () => {
		const actual = burgerConstructorSlice(undefined, setBun(bunMock));
		expect(actual.bun).toEqual(bunMock);
	});

	it('должен успешно добавить ингредиент в конструктор', () => {
		const actual = burgerConstructorSlice(
			undefined,
			addIngredientToConstructor(ingredientMock)
		);
		expect(actual.ingredients).toHaveLength(1);
		expect(actual.ingredients[0]).toEqual(ingredientMock);
		expect(
			actual.ingredients.find((ing) => ing.item.type === 'bun')
		).toBeUndefined();
	});

	it('должен успешно удалить ингредиент по id', () => {
		const stateWithItems = {
			bun: null,
			ingredients: [ingredientMock, anotherIngredientMock],
		};

		const actual = burgerConstructorSlice(
			stateWithItems,
			removeIngredientFromConstructor(ingredientMock.id)
		);
		expect(actual.ingredients).toHaveLength(1);
		expect(actual.ingredients[0].id).toBe(anotherIngredientMock.id);
	});

	it('должен заменить список ингредиентов', () => {
		const newIngredientsList = [ingredientMock];

		const actual = burgerConstructorSlice(
			undefined,
			setIngredientsConstructorList(newIngredientsList)
		);
		expect(actual.ingredients).toBe(newIngredientsList);
	});

	it('должен очистить state', () => {
		const stateWithValues = {
			bun: bunMock,
			ingredients: [ingredientMock],
		};

		const actual = burgerConstructorSlice(stateWithValues, clearList());
		expect(actual).toEqual({
			bun: null,
			ingredients: [],
		});
	});
});
