import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { POSITION_BOTTOM, POSITION_TOP } from '../../const/const';
import styles from './constructorCard.module.css';
import { removeIngredientFromConstructor } from '@services/slice/burgerConstructorSlice';
import { useDrag, useDrop } from 'react-dnd';
import React, { useRef } from 'react';
import { useAppDispatch } from '@services/store';
import { Ingredient } from '../../types/ingredientsResponse';
import { ConstructorItem } from '../../types/constructorItem';

interface Props {
	item: Ingredient;
	id: string;
	locked: boolean;
	position?: 'top' | 'bottom';
	moveItem?: (dragIndex: string, hoverIndex: string) => void;
}
export const ConstructorCard = ({
	item,
	id,
	locked,
	position,
	moveItem,
}: Props) => {
	const dispatch = useAppDispatch();

	const handleClick = (id: string) => {
		dispatch(removeIngredientFromConstructor(id));
	};

	const getOptionalPositionText = (item: Ingredient) => {
		if (position === POSITION_TOP) {
			return `${item.name} (верх)`;
		} else if (position === POSITION_BOTTOM) {
			return `${item.name} (низ)`;
		}
		return item.name;
	};

	const ref = useRef<HTMLDivElement>(null);
	const [, drop] = useDrop<ConstructorItem, unknown>({
		accept: 'DRAG_ELEMENT',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.id;
			const hoverIndex = id;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY =
				(clientOffset?.y && clientOffset.y - hoverBoundingRect.top) || 0;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveItem && moveItem(dragIndex, hoverIndex);
			item.id = hoverIndex;
		},
	});

	const [, drag] = useDrag<ConstructorItem>({
		type: 'DRAG_ELEMENT',
		item: { id: id, item: item },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));
	return (
		<div ref={ref} className={`pr-4 ${styles.card}`}>
			{!locked && (
				<DragIcon type={'primary'} className={styles.card_pointer}></DragIcon>
			)}
			<ConstructorElement
				extraClass={styles.card_extra}
				isLocked={locked}
				type={position}
				text={getOptionalPositionText(item)}
				thumbnail={item.image}
				price={item.price}
				handleClose={() => handleClick(id)}
			/>
		</div>
	);
};
