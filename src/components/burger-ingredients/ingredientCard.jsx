import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import {IngredientModal} from '@components/modal/ingredientModal';
import PropTypes from 'prop-types';
import {ingredientProps} from '@utils/props';
import {useDispatch, useSelector} from "react-redux";
import {detachSelected, setSelected} from "@components/burger-ingredients/services/burgerIngredientsSlice";

export const IngredientCard = ({item, count, index}) => {
	const dispatch = useDispatch();
	const {selectedIngredient} = useSelector((state) => state.ingredients);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (id) => {
		dispatch(setSelected(id))
		setIsModalOpen(true);
	}
	const closeModal = () => {
		setIsModalOpen(false);
		dispatch(detachSelected())
	}

	return (
		<>
			{selectedIngredient &&
				<IngredientModal
					isOpen={isModalOpen}
					onClose={closeModal}
					data={selectedIngredient}>
				</IngredientModal>
			}
			<li
				onClick={e => openModal(item._id)}
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
					<div style={{position: 'relative', left: '135px'}}>
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
					style={{display: 'flex', flexDirection: 'row'}}>
					<p className={'text text_type_digits-default'}>{item.price}</p>
					<CurrencyIcon type={'primary'}></CurrencyIcon>
				</div>
				<p
					className={'text text_type_main-small'}
					style={{textAlign: 'center'}}>
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
