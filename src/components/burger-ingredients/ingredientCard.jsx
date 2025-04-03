import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { IngredientModal } from '@components/modal/ingredientModal';
import PropTypes from 'prop-types';
import { ingredientProps } from '@utils/props';
import { useDispatch, useSelector } from 'react-redux';
import {
	detachSelected,
	setSelected,
} from '@components/burger-ingredients/services/selectedIngredientSlice';
import { useDrag } from 'react-dnd';
import { DRAG_BUN, DRAG_INGREDIENT, TYPE_BUN } from '../../const/const';

export const IngredientCard = ({ item, count, index }) => {
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
			}
		},
	}));

	const [{ isDraggingBun }, dragBun] = useDrag(() => ({
		type: DRAG_BUN,
		item: item,
		collect: (monitor) => ({
			isDraggingBun: monitor.isDragging(),
		}),
		end(item, monitor) {
			if (monitor.didDrop()) {
			}
		},
	}));

	return (
		<>
			{selectedIngredient && (
				<IngredientModal
					isOpen={isModalOpen}
					onClose={closeModal}
					data={selectedIngredient}></IngredientModal>
			)}
			<li
				id={`ingredient-${index}`}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '208px',
					width: '272px',
					justifyContent: 'flex-start',
					alignItems: 'center',
					border:
						isDragging || isDraggingBun ? '1px solid #3E3E3EFF' : 'transparent',
					boxShadow:
						isDragging || isDraggingBun ? '0 0 1px 1px #3E3E3E91' : 'none',
					borderRadius: '10px',
				}}>
				{count ? (
					<div style={{ position: 'relative', left: '135px' }}>
						<Counter count={count} size={'default'}></Counter>
					</div>
				) : undefined}
				<img
					ref={item.type === TYPE_BUN ? dragBun : drag}
					onClick={() => openModal(item)}
					className={'pl-4 pr-4'}
					src={item.image}
					alt='Избображение'
					width={'240px'}
					height={'120px'}
					style={{ cursor: 'pointer' }}
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
