import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {DRAG_INGREDIENT, POSITION_BOTTOM, POSITION_TOP} from '../../const/const';
import styles from './constructorCard.module.css';
import PropTypes from 'prop-types';
import { cardItemProps } from '@utils/props';
import { useDispatch } from 'react-redux';
import { removeIngredientFromConstructor } from '@components/burger-constructor/services/burgerConstructorSlice';
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";

export const ConstructorCard = ({ item, id, locked, position, moveItem }) => {
	const dispatch = useDispatch();

	const handleClick = (id) => {
		dispatch(removeIngredientFromConstructor(id));
	};

	const getOptionalPositionText = (item) => {
		if (position === POSITION_TOP) {
			return `${item.name} (верх)`;
		} else if (position === POSITION_BOTTOM) {
			return `${item.name} (низ)`;
		}
		return item.name;
	};

	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: "DRAG_ELEMENT",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
		},
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.id
			const hoverIndex = id;
			if (dragIndex === hoverIndex) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientY = clientOffset.y - hoverBoundingRect.top

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveItem(dragIndex, hoverIndex);
			item.id = hoverIndex;
		},
	})

	const [, drag] = useDrag({
		type: "DRAG_ELEMENT",
		item: { id: id, item: item },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));
	return (
		<div ref={!position ? ref : useRef(null)} className={`pr-4 ${styles.card}`}>
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

ConstructorCard.propTypes = {
	item: cardItemProps,
	id: PropTypes.string,
	locked: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(['top', 'bottom']),
	moveItem: PropTypes.func
};
