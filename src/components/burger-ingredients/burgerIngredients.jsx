import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IngredientCard } from '@components/burger-ingredients/ingredientCard';
import { TYPE_BUN, TYPE_MAIN, TYPE_SAUCE } from '../../const/const';
import styles from './burgerIngredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '@components/burger-ingredients/services/burgerIngredientsSlice';
import { useDrag, useDrop } from 'react-dnd';

export const BurgerIngredients = ({ setIsDraggingOverConstructor }) => {
	const dispatch = useDispatch();
	const { ingredients, status, error } = useSelector(
		(state) => state.ingredients
	);
	const { ingredients: constructorIngredients, bun: constructorBun } =
		useSelector((state) => state.burgerConstructor);

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

	const getCountById = (id) => {
		return counterArray?.find((item) => item.id === id)?.count;
	};

	const [currentTab, setCurrentTab] = useState(TYPE_BUN);

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

	const handleCategoryClick = (category, ref) => {
		if (ref && ref.current) {
			setCurrentTab(category);
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	// TODO не работает изменение активной категории при ручном скролле. починить
	useEffect(() => {
		if (status === 'success') {
			const scrollContainer = scrollContainerRef.current;

			const handleScroll = () => {
				const scrollPosition = scrollContainer.scrollTop + 100;
				const isCategoryVisible = (ref) => {
					return (
						ref.offsetTop <= scrollPosition &&
						ref.offsetTop + ref.offsetHeight > scrollPosition
					);
				};

				if (isCategoryVisible(categoryBunRef)) setCurrentTab(TYPE_BUN);
				else if (isCategoryVisible(categorySauceRef)) setCurrentTab(TYPE_SAUCE);
				else if (isCategoryVisible(categoryMainRef)) setCurrentTab(TYPE_MAIN);
			};

			scrollContainer.addEventListener('scroll', handleScroll);
			return () => scrollContainer.removeEventListener('scroll', handleScroll);
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
					<div id={'bun_block'} className={'pt-10'} ref={categoryBunRef}>
						<p className={'text text_type_main-medium pt-10'}>Булки</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{breadItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
									setIsDraggingOverConstructor={setIsDraggingOverConstructor}
								/>
							))}
						</div>
					</div>

					<div id={'sauce_block'} className={'pt-10'} ref={categorySauceRef}>
						<p className={'text text_type_main-medium pt-10'}>Соусы</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{sauceItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
									setIsDraggingOverConstructor={setIsDraggingOverConstructor}
								/>
							))}
						</div>
					</div>

					<div id={'main_block'} className={'pt-10'} ref={categoryMainRef}>
						<p className={'text text_type_main-medium pt-10'}>Начинки</p>
						<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
							{mainItems?.map((item, index) => (
								<IngredientCard
									key={index}
									item={item}
									index={index}
									count={getCountById(item._id)}
									setIsDraggingOverConstructor={setIsDraggingOverConstructor}
								/>
							))}
						</div>
					</div>
				</ul>
			)}
		</div>
	);
};
