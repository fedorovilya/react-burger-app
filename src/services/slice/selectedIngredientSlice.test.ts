import { Ingredient } from '../../types/ingredientsResponse';
import selectedIngredientSlice, {
	detachSelected,
	initialState,
	SelectedIngredientData,
	setSelected,
} from '@services/slice/selectedIngredientSlice';

describe('тесты selectedIngredientsSlice', () => {
	const mockIngredient: Ingredient = {
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

	it('должен использовать initialState по умолчанию', () => {
		const actual = selectedIngredientSlice(undefined, { type: '' });
		expect(actual).toEqual(initialState);
	});

	it('должен установить ингредиент когда вызван setSelected', () => {
		const actual = selectedIngredientSlice(
			undefined,
			setSelected(mockIngredient)
		);
		expect(actual.selectedIngredient).toEqual(mockIngredient);
	});

	it('должен очистить выбранный ингредиент когда вызван detachSelected', () => {
		const stateWithIngredient: SelectedIngredientData = {
			selectedIngredient: mockIngredient,
		};

		const actual = selectedIngredientSlice(
			stateWithIngredient,
			detachSelected()
		);
		expect(actual.selectedIngredient).toBeNull();
	});
});
