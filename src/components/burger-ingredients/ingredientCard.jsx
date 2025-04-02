import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { IngredientModal } from '@components/modal/ingredientModal';
import PropTypes from 'prop-types';
import { ingredientProps } from '@utils/props';
import { useDispatch, useSelector } from 'react-redux';
import {
	detachSelected,
	setSelected,
} from '@components/burger-ingredients/services/selectedIngredientSlice';
import { useDrag } from 'react-dnd';
import { DRAG_BUN, DRAG_INGREDIENT } from '../../const/const';

export const IngredientCard = ({
	item,
	count,
	index,
	setIsDraggingOverConstructor,
}) => {
	const dispatch = useDispatch();
	const { selectedIngredient } = useSelector(
		(state) => state.selectedIngredient
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (item) => {
		dispatch(setSelected(item));
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		dispatch(detachSelected());
	};

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DRAG_INGREDIENT,
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end(item, monitor) {
			if (monitor.didDrop()) {
				setIsDraggingOverConstructor(false);
			}
		},
	}));

	useEffect(() => {
		if (isDragging) {
			setIsDraggingOverConstructor(true);
		}
	}, [isDragging]);

	return (
		<>
			{selectedIngredient && (
				<IngredientModal
					isOpen={isModalOpen}
					onClose={closeModal}
					data={selectedIngredient}></IngredientModal>
			)}
			<li
				ref={drag}
				onClick={(e) => openModal(item)}
				id={`ingredient-${index}`}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '208px',
					width: '272px',
					justifyContent: 'flex-start',
					alignItems: 'center',
					cursor: 'pointer',
				}}>
				{count ? (
					<div style={{ position: 'relative', left: '135px' }}>
						<Counter count={count} size={'default'}></Counter>
					</div>
				) : undefined}
				<img
					className={'pl-4 pr-4'}
					src={item.image}
					alt='Избображение'
					width={'240px'}
					height={'120px'}
				/>
				<div
					className={'pt-1 pb-1'}
					style={{ display: 'flex', flexDirection: 'row' }}>
					<p className={'text text_type_digits-default'}>{item.price}</p>
					<CurrencyIcon type={'primary'}></CurrencyIcon>
				</div>
				<p
					className={'text text_type_main-small'}
					style={{ textAlign: 'center' }}>
					{item.name}
				</p>
			</li>
		</>
	);
};

IngredientCard.propTypes = {
	item: ingredientProps,
	count: PropTypes.number,
	index: PropTypes.number.isRequired,
};
