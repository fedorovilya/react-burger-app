import { SELECTED_DATA } from '@utils/selectedData';
import { POSITION_BOTTOM, POSITION_TOP, TYPE_BUN } from '../../const/const';
import { ConstructorCard } from '@components/burger-constructor/constructorCard';
import { OrderBar } from '@components/burger-constructor/orderBar';
import styles from './burgerConstructor.module.css';

export const BurgerConstructor = () => {
	let bunElement;
	const ingredientItems = SELECTED_DATA.reduce((elements, item) => {
		item.type === TYPE_BUN ? (bunElement = item) : elements.push(item);

		return elements;
	}, []);

	const getTotalPrice = (items) => {
		return items.reduce((sum, item) => {
			return sum + item.price;
		}, 0);
	};

	return (
		<div className={`pt-25 pl-4 pr-4 ${styles.flex_main}`}>
			<div className={styles.flex_cards}>
				{bunElement ? (
					<ConstructorCard
						id={'bun_top'}
						item={bunElement}
						locked={true}
						position={POSITION_TOP}></ConstructorCard>
				) : undefined}

				<ul className={`pt-4 pb-4 ${styles.flex_cards_list}`}>
					{ingredientItems
						? ingredientItems.map((item, index) => (
								<li key={`ingredient-${index}`}>
									<ConstructorCard item={item}></ConstructorCard>
								</li>
						  ))
						: undefined}
				</ul>

				{bunElement ? (
					<ConstructorCard
						id={'bun_bottom'}
						item={bunElement}
						locked={true}
						position={POSITION_BOTTOM}></ConstructorCard>
				) : undefined}
			</div>
			<OrderBar totalCost={getTotalPrice(ingredientItems)}></OrderBar>
		</div>
	);
};
