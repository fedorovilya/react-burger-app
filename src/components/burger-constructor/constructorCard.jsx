import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { POSITION_BOTTOM, POSITION_TOP } from '../../const/const';
import styles from './constructorCard.module.css';
import PropTypes from 'prop-types';
import { cardItemProps } from '@utils/props';

export const ConstructorCard = ({ item, locked, position }) => {
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
			/>
		</div>
	);
};

ConstructorCard.propTypes = {
	item: cardItemProps,
	locked: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(['top', 'bottom']),
};
