import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IngredientCard } from '@components/burger-ingredients/ingredientCard';
import { TYPE_BUN, TYPE_MAIN, TYPE_SAUCE } from '../../const/const';
import styles from './burgerIngredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '@components/burger-ingredients/services/burgerIngredientsSlice';

export const BurgerIngredients = () => {
	const dispatch = useDispatch();
	const { ingredients, status, error } = useSelector(
		(state) => state.ingredients
	);
	const { ingredients: constructorIngredients, bun: constructorBun } =
		useSelector((state) => state.burgerConstructor);

	const [currentTab, setCurrentTab] = useState(TYPE_BUN);

	const categoryBunRef = useRef(null);
	const categorySauceRef = useRef(null);
	const categoryMainRef = useRef(null);
	const scrollContainerRef = useRef(null);

	const counterArray = useMemo(() => {
		const result = [];
		constructorIngredients?.forEach((ingredient) => {
			const id = ingredient.item._id;

			const elementInResult = result.find(
				(counterItem) => counterItem.id === id
			);

			elementInResult
				? (elementInResult.count += 1)
				: result.push({ id: id, count: 1 });
		});
		constructorBun && result.push({ id: constructorBun._id, count: 2 });
		return result;
	}, [constructorIngredients, constructorBun]);

	const breadItems = useMemo(() => {
		return ingredients && ingredients.filter((item) => item.type === TYPE_BUN);
	}, [ingredients]);

	const sauceItems = useMemo(() => {
		return (
			ingredients && ingredients.filter((item) => item.type === TYPE_SAUCE)
		);
	}, [ingredients]);

	const mainItems = useMemo(() => {
		return ingredients && ingredients.filter((item) => item.type === TYPE_MAIN);
	}, [ingredients]);

	const getCountById = (id) => {
		return counterArray?.find((item) => item.id === id)?.count;
	};

	const handleCategoryClick = (category, ref) => {
		if (ref && ref.current) {
			setCurrentTab(category);
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const checkVisibleCategory = () => {
		if (!scrollContainerRef.current) return;

		const containerRect = scrollContainerRef.current.getBoundingClientRect();
		const bunRect = categoryBunRef.current?.getBoundingClientRect();
		const sauceRect = categorySauceRef.current?.getBoundingClientRect();
		const mainRect = categoryMainRef.current?.getBoundingClientRect();

		// Создаем массив с категориями и их расстояниями до верхнего края контейнера
		const categories = [
			{ name: TYPE_BUN, rect: bunRect },
			{ name: TYPE_SAUCE, rect: sauceRect },
			{ name: TYPE_MAIN, rect: mainRect },
		];

		let closestCategory = null;
		let minDistance = Infinity;

		// Находим категорию с минимальным расстоянием до верхнего края контейнера
		// Независимо от нахождения в области видимости сверху/снизу от верхней границы контейнера
		categories.forEach(({ name, rect }) => {
			// Расстояние от верхнего края блока (его заголовка) до верхнего края контейнера
			const distance = Math.abs(rect.top - containerRect.top);

			// Если расстояние меньше текущего минимального, обновляем ближайшую категорию
			if (distance < minDistance) {
				minDistance = distance;
				closestCategory = name;
			}
		});

		if (closestCategory) {
			setCurrentTab(closestCategory);
		}
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	useEffect(() => {
		if (status === 'success') {
			let timeoutId = null;

			const handleScroll = () => {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					checkVisibleCategory();
				}, 100);
			};

			const container = scrollContainerRef.current;
			if (container) {
				container.addEventListener('scroll', handleScroll);
			}

			return () => {
				if (container) {
					container.removeEventListener('scroll', handleScroll);
				}
			};
		}
	}, [status]);

	const errorList = () => {
		return <p className={'text text_type_main-medium pt-10'}>{error}</p>;
	};
	const loadingList = () => {
		return (
			<p className={'text text_type_main-medium pt-10'}>
				Загрузка списка ингредиентов...
			</p>
		);
	};

	return (
		<div className={styles.ingredients_flex}>
			<p className={'pt-10 text text_type_main-large'}>Соберите бургер</p>
			<div className={'pt-5'} style={{ display: 'flex' }}>
				<Tab
					value={TYPE_BUN}
					active={currentTab === TYPE_BUN}
					onClick={(value) => handleCategoryClick(value, categoryBunRef)}>
					Булки
				</Tab>
				<Tab
					value={TYPE_SAUCE}
					active={currentTab === TYPE_SAUCE}
					onClick={(value) => handleCategoryClick(value, categorySauceRef)}>
					Соусы
				</Tab>
				<Tab
					value={TYPE_MAIN}
					active={currentTab === TYPE_MAIN}
					onClick={(value) => handleCategoryClick(value, categoryMainRef)}>
					Начинки
				</Tab>
			</div>
			{status === 'loading' && loadingList()}
			{status === 'fail' && errorList()}
			{status === 'success' && (
				<ul ref={scrollContainerRef} className={styles.ingredients_flex_list}>
					<div id={'bun_block'} ref={categoryBunRef}>
						<p className={'text text_type_main-medium pt-10'}>Булки</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{breadItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
								/>
							))}
						</div>
					</div>

					<div id={'sauce_block'} ref={categorySauceRef}>
						<p className={'text text_type_main-medium pt-10'}>Соусы</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{sauceItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
								/>
							))}
						</div>
					</div>

					<div id={'main_block'} ref={categoryMainRef}>
						<p className={'text text_type_main-medium pt-10'}>Начинки</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{mainItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
								/>
							))}
						</div>
					</div>
				</ul>
			)}
		</div>
	);
};
