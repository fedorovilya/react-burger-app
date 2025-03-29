import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { IngredientCard } from '@components/burger-ingredients/ingredientCard';
import { TYPE_BUN, TYPE_MAIN, TYPE_SAUCE } from '../../const/const';
import styles from './burgerIngredients.module.css';
import { ingredientsProps } from '@utils/props';

export const BurgerIngredients = ({ ingredients }) => {
	const [current, setCurrent] = useState(TYPE_BUN);

	const breadItems = ingredients.filter((item) => item.type === TYPE_BUN);
	const sauceItems = ingredients.filter((item) => item.type === TYPE_SAUCE);
	const mainItems = ingredients.filter((item) => item.type === TYPE_MAIN);

	const categoryBunRef = useRef(null);
	const categorySauceRef = useRef(null);
	const categoryMainRef = useRef(null);

	const scrollContainerRef = useRef(null);

	const handleCategoryClick = (category, ref) => {
		if (ref && ref.current) {
			setCurrent(category);
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	// TODO не работает изменение активной категории при ручном скролле. починить
	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;

		const handleScroll = () => {
			const scrollPosition = scrollContainer.scrollTop + 100;
			const isCategoryVisible = (ref) => {
				return (
					ref.offsetTop <= scrollPosition &&
					ref.offsetTop + ref.offsetHeight > scrollPosition
				);
			};

			if (isCategoryVisible(categoryBunRef)) setCurrent(TYPE_BUN);
			else if (isCategoryVisible(categorySauceRef)) setCurrent(TYPE_SAUCE);
			else if (isCategoryVisible(categoryMainRef)) setCurrent(TYPE_MAIN);
		};

		scrollContainer.addEventListener('scroll', handleScroll);
		return () => scrollContainer.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={styles.ingredients_flex}>
			<p className={'pt-10 text text_type_main-large'}>Соберите бургер</p>
			<div className={'pt-5'} style={{ display: 'flex' }}>
				<Tab
					value={TYPE_BUN}
					active={current === TYPE_BUN}
					onClick={(value) => handleCategoryClick(value, categoryBunRef)}>
					Булки
				</Tab>
				<Tab
					value={TYPE_SAUCE}
					active={current === TYPE_SAUCE}
					onClick={(value) => handleCategoryClick(value, categorySauceRef)}>
					Соусы
				</Tab>
				<Tab
					value={TYPE_MAIN}
					active={current === TYPE_MAIN}
					onClick={(value) => handleCategoryClick(value, categoryMainRef)}>
					Начинки
				</Tab>
			</div>

			<ul ref={scrollContainerRef} className={styles.ingredients_flex_list}>
				<div id={'bun_block'} className={'pt-10'} ref={categoryBunRef}>
					<p className={'text text_type_main-medium pt-10'}>Булки</p>
					<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
						{breadItems?.map((item, index) => (
									<IngredientCard
										key={index}
										item={item}
										index={index}
										count={1}></IngredientCard>
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
										index={index}></IngredientCard>
							  ))}
					</div>
				</div>

				<div id={'main_block'} className={'pt-10'} ref={categoryMainRef}>
					<p className={'text text_type_main-medium pt-10'}>Начинки</p>
					<div className={`pt-6 pl-4 pr-4 ${styles.ingredients_grid}`}>
						{mainItems
							? mainItems.map((item, index) => (
									<IngredientCard
										key={index}
										item={item}
										index={index}></IngredientCard>
							  ))
							: undefined}
					</div>
				</div>
			</ul>
		</div>
	);
};

BurgerIngredients.propTypes = {
	ingredients: ingredientsProps.isRequired,
};
