import { SELECTED_DATA } from '@utils/selectedData';
import {
	DRAG_INGREDIENT,
	POSITION_BOTTOM,
	POSITION_TOP,
	TYPE_BUN,
} from '../../const/const';
import { ConstructorCard } from '@components/burger-constructor/constructorCard';
import { OrderBar } from '@components/burger-constructor/orderBar';
import styles from './burgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
	addIngredientToConstructor,
	setIngredientsConstructorList,
} from '@components/burger-constructor/services/burgerConstructorSlice';

export const BurgerConstructor = ({ isDraggingOverConstructor }) => {
	const dispatch = useDispatch();
	const { ingredients: constructorIngredients, bun: constructorBun } =
		useSelector((state) => state.burgerConstructor);

	const totalCost = useMemo(() => {
		const ingredientsSum = constructorIngredients?.reduce((sum, element) => {
			return sum + element.item.price;
		}, 0);

		return constructorBun
			? ingredientsSum + constructorBun.price * 2
			: ingredientsSum;
	}, [constructorIngredients, constructorBun]);

	// формируем массив с id элементов (пересчет каждый раз когда меняется массив ингредиентов или булка)
	const orderItems = useMemo(() => {
		let orderItemsResult = [];

		if (constructorIngredients.length > 0) {
			orderItemsResult = constructorIngredients.map(
				(ingredient) => ingredient.item._id
			);
		}
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

	const moveItem = (dragIndex, hoverIndex) => {
		const newList = [...constructorIngredients];
		const draggedItem = newList.splice(dragIndex, 1)[0];
		newList.splice(hoverIndex, 0, draggedItem);
		dispatch(setIngredientsConstructorList(newList));
	};

	const [, drop] = useDrop({
		accept: DRAG_INGREDIENT,
		drop: (item) => {
			// Добавляем новый элемент
			const newElem = { id: uuidv4(), item: item };
			dispatch(addIngredientToConstructor(newElem));

			// Возвращаем данные для продолжения перетаскивания
			return {
				constructorId: newElem.id,
				index: constructorIngredients.length, // Добавляем в конец
			};
		},
		hover: (draggedItem, monitor) => {
			if (!draggedItem.constructorId) return;

			const dragIndex = draggedItem.index;
			const hoverIndex = monitor.getItem().index;

			if (dragIndex === hoverIndex) return;

			moveItem(dragIndex, hoverIndex);
			draggedItem.index = hoverIndex;
		},
	});

	return (
		<div className={`pt-25 pl-4 pr-4 ${styles.flex_main}`}>
			<div className={styles.flex_cards}>
				{bunElement ? (
					<ConstructorCard
						id={'bun_top'}
						item={bunElement}
						locked={true}
						position={POSITION_TOP}></ConstructorCard>
				) : (
					getEmptyCard(POSITION_TOP)
				)}

				<ul ref={drop} className={`pt-4 pb-4 ${styles.flex_cards_list}`}>
					{constructorIngredients && constructorIngredients.length !== 0
						? constructorIngredients.map((element) => (
								<li key={element.id}>
									<ConstructorCard
										item={element.item}
										id={element.id}
										locked={false}></ConstructorCard>
								</li>
						  ))
						: getEmptyCard()}
				</ul>

				{bunElement ? (
					<ConstructorCard
						id={'bun_top'}
						item={bunElement}
						locked={true}
						position={POSITION_BOTTOM}></ConstructorCard>
				) : (
					getEmptyCard(POSITION_BOTTOM)
				)}
			</div>
			{orderItems.length > 0 && totalCost > 0 && (
				<OrderBar totalCost={totalCost} orderItems={orderItems} />
			)}
		</div>
	);
};

const getEmptyCard = (position) => {
	if (position === POSITION_BOTTOM) {
		return (
			<div
				className={`${styles.constructor_element} ${styles.constructor_element_pos_bottom}`}>
				<p className={styles.constructor_element__text}>
					Добавьте булку в конструктор
				</p>
			</div>
		);
	} else if (position === POSITION_TOP) {
		return (
			<div
				className={`${styles.constructor_element} ${styles.constructor_element_pos_top}`}>
				<p className={styles.constructor_element__text}>
					Добавьте булку в конструктор
				</p>
			</div>
		);
	} else {
		return (
			<div className={'pt-4 pb-4'}>
				<div className={`${styles.constructor_element}`}>
					<p className={styles.constructor_element__text}>
						Добавьте ингредиент в конструктор
					</p>
				</div>
			</div>
		);
	}
};
