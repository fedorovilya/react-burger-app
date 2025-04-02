import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { POSITION_BOTTOM, POSITION_TOP } from '../../const/const';
import styles from './constructorCard.module.css';
import PropTypes from 'prop-types';
import { cardItemProps } from '@utils/props';
import { useDispatch } from 'react-redux';
import { removeIngredientFromConstructor } from '@components/burger-constructor/services/burgerConstructorSlice';

export const ConstructorCard = ({ item, id, locked, position }) => {
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
	return (
		<div className={`pr-4 ${styles.card}`}>
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
	locked: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(['top', 'bottom']),
};
