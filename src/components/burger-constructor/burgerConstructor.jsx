import {SELECTED_DATA} from '@utils/selectedData';
import {POSITION_BOTTOM, POSITION_TOP, TYPE_BUN} from '../../const/const';
import {ConstructorCard} from '@components/burger-constructor/constructorCard';
import {OrderBar} from '@components/burger-constructor/orderBar';
import styles from './burgerConstructor.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const {ingredients: constructorIngredients, bun: constructorBun} =
		useSelector((state) => state.constructor);

	const totalCost = useMemo(() => {
		const ingredientsSum = constructorIngredients?.reduce((sum, item) => {
			return sum + item.price;
		}, 0);

		return ingredientsSum + constructorBun?.price * 2;
	}, [constructorIngredients, constructorBun]);

	// формируем массив с id элементов (пересчет каждый раз когда меняется массив ингредиентов или булка)
	const orderItems = useMemo(() => {
		let orderItemsResult = [];
		constructorIngredients &&
		orderItemsResult.push(
			constructorIngredients.map((ingredient) => ingredient.item._id)
		);
		constructorBun && orderItemsResult.push(constructorBun._id);

		return orderItemsResult;
	}, [constructorIngredients, constructorBun]);

	let bunElement = null;
	const ingredientItems = SELECTED_DATA.reduce((elements, item) => {
		item.type === TYPE_BUN ? (bunElement = item) : elements.push(item);

		return elements;
	}, []);

	const getTotalPrice = (items) => {
		const ingredientsSum = items.reduce((sum, item) => {
			return sum + item.price;
		}, 0);

		if (!bunElement) {
			return ingredientsSum;
		}
		return ingredientsSum + bunElement.price * 2;
	};

	return (
		<div className={`pt-25 pl-4 pr-4 ${styles.flex_main}`}>
			<div className={styles.flex_cards}>
				{bunElement
					? (
						<ConstructorCard
							id={'bun_top'}
							item={bunElement}
							locked={true}
							position={POSITION_TOP}></ConstructorCard>
					)
					: getEmptyCard(POSITION_TOP)}

				{ingredientItems
					? (
						<ul className={`pt-4 pb-4 ${styles.flex_cards_list}`}>
							{ingredientItems.map((item, index) => (
								<li key={index}>
									<ConstructorCard item={item} locked={false}></ConstructorCard>
								</li>
							))}
						</ul>)
					: getEmptyCard()
				}

				{bunElement
					? (
						<ConstructorCard
							id={'bun_top'}
							item={bunElement}
							locked={true}
							position={POSITION_BOTTOM}></ConstructorCard>
					)
					: getEmptyCard(POSITION_BOTTOM)}
			</div>
			<OrderBar totalCost={getTotalPrice(ingredientItems)}/>
			{/*<OrderBar totalCost={totalCost}/>*/}
		</div>
	);
};

const getEmptyCard = (position) => {
	if (position === POSITION_BOTTOM) {
		return (
			<div className={`${styles.constructor_element} ${styles.constructor_element_pos_bottom}`}>
				<p className={styles.constructor_element__text}>
					Добавьте булку в конструктор
				</p>
			</div>
		)
	} else if (position === POSITION_TOP) {
		return (
			<div className={`${styles.constructor_element} ${styles.constructor_element_pos_top}`}>
				<p className={styles.constructor_element__text}>
					Добавьте булку в конструктор
				</p>
			</div>
		)
	} else {
		return (
			<div className={'pt-4 pb-4'}>
				<div className={`${styles.constructor_element}`}>
					<p className={styles.constructor_element__text}>
						Добавьте ингредиент в конструктор
					</p>
				</div>
			</div>
		)
	}
}
