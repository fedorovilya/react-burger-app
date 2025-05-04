import {
	DRAG_BUN,
	DRAG_INGREDIENT,
	POSITION_BOTTOM,
	POSITION_TOP,
} from '../../const/const';
import { ConstructorCard } from '@components/burger-constructor/constructorCard';
import { OrderBar } from '@components/burger-constructor/orderBar';
import styles from './burgerConstructor.module.css';
import { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
	addIngredientToConstructor,
	setBun,
	setIngredientsConstructorList,
} from '@services/slice/burgerConstructorSlice';
import {useAppDispatch, useAppSelector} from "@services/store";

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const { ingredients: constructorIngredients, bun: constructorBun } =
		useAppSelector((state) => state.burgerConstructor);

	const totalCost = useMemo(() => {
		const ingredientsSum = constructorIngredients?.reduce((sum, element) => {
			return sum + element.item.price;
		}, 0);

		return constructorBun
			? ingredientsSum + constructorBun.price * 2
			: ingredientsSum;
	}, [constructorIngredients, constructorBun]);

	// формируем массив с id элементов (перерасчет каждый раз когда меняется массив ингредиентов или булка)
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

	const moveItem = useCallback(
		(dragIndex, hoverIndex) => {
			const newList = [...constructorIngredients];

			const dragId = newList.findIndex((item) => item.id === dragIndex);
			const hoverId = newList.findIndex((item) => item.id === hoverIndex);

			if (dragId === -1 || hoverId === -1) {
				return;
			}

			const [movedItem] = newList.splice(dragId, 1);
			newList.splice(hoverId, 0, movedItem);

			dispatch(setIngredientsConstructorList(newList));
		},
		[constructorIngredients]
	);

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: DRAG_INGREDIENT,
		drop: (item) => {
			if (item?.id) return;

			const newElem = { id: uuidv4(), item: item };
			dispatch(addIngredientToConstructor(newElem));
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const [{ canDropTopBun, isOverTopBun }, dropTopBun] = useDrop({
		accept: DRAG_BUN,
		drop: (item) => {
			if (item?.id) return;
			dispatch(setBun(item));
		},
		collect: (monitor) => ({
			isOverTopBun: monitor.isOver(),
			canDropTopBun: monitor.canDrop(),
		}),
	});

	const [{ canDropBottomBun, isOverBottomBun }, dropBottomBun] = useDrop({
		accept: DRAG_BUN,
		drop: (item) => {
			if (item?.id) return;
			dispatch(setBun(item));
		},
		collect: (monitor) => ({
			isOverBottomBun: monitor.isOver(),
			canDropBottomBun: monitor.canDrop(),
		}),
	});

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

	return (
		<div className={`pt-25 pl-4 pr-4 ${styles.flex_main}`}>
			<div className={styles.flex_cards}>
				<div
					ref={dropTopBun}
					style={{
						border: canDropTopBun
							? isOverTopBun
								? '5px solid #646cff'
								: '1px solid #646cff'
							: 'transparent',
						boxShadow: canDropTopBun ? '0 0 3px 3px #646CFF86' : 'none',
						borderRadius: '10px',
					}}>
					{constructorBun ? (
						<ConstructorCard
							id={'bun_top'}
							item={constructorBun}
							locked={true}
							position={POSITION_TOP}></ConstructorCard>
					) : (
						getEmptyCard(POSITION_TOP)
					)}
				</div>

				<ul
					ref={drop}
					className={`pt-4 pb-4 ${styles.flex_cards_list}`}
					style={{
						border: canDrop
							? isOver
								? '5px solid #646cff'
								: '1px solid #646cff'
							: 'transparent',
						boxShadow: canDrop ? '0 0 3px 3px #646CFF86' : 'none',
						borderRadius: '10px',
					}}>
					{constructorIngredients && constructorIngredients.length !== 0
						? constructorIngredients.map((element) => (
								<li key={element.id}>
									<ConstructorCard
										item={element.item}
										id={element.id}
										locked={false}
										moveItem={moveItem}></ConstructorCard>
								</li>
						  ))
						: getEmptyCard()}
				</ul>

				<div
					ref={dropBottomBun}
					style={{
						border: canDropBottomBun
							? isOverBottomBun
								? '5px solid #646cff'
								: '1px solid #646cff'
							: 'transparent',
						boxShadow: canDropBottomBun ? '0 0 3px 3px #646CFF86' : 'none',
						borderRadius: '10px',
					}}>
					{constructorBun ? (
						<ConstructorCard
							id={'bun_top'}
							item={constructorBun}
							locked={true}
							position={POSITION_BOTTOM}></ConstructorCard>
					) : (
						getEmptyCard(POSITION_BOTTOM)
					)}
				</div>
			</div>
			{orderItems.length > 0 && totalCost > 0 && (
				<OrderBar totalCost={totalCost} orderItems={orderItems} />
			)}
		</div>
	);
};
