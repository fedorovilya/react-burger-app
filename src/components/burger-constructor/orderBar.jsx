import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orderBar.module.css';
import { useCallback, useState } from 'react';
import { OrderModal } from '@components/modal/orderModal';
import PropTypes from 'prop-types';
import { API_CREATE_ORDER_ENDPOINT } from '../../const/const';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderRequest } from '@components/burger-constructor/services/orderSlice';

export const OrderBar = ({ orderItems, totalCost }) => {
	const dispatch = useDispatch();
	const { order, status } = useSelector((state) => state.order);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => setIsModalOpen(false);

	const handleClick = async () => {
		await dispatch(
			createOrderRequest({
				ingredients: orderItems,
			})
		);
		openModal();
	};

	return (
		<>
			<OrderModal
				isOpen={isModalOpen}
				onClose={closeModal}
				orderId={order?.number}></OrderModal>
			<div className={`pr-4 ${styles.order_bar_flex}`}>
				<div className={styles.order_bar_cost}>
					<p className='text text_type_digits-medium'>{totalCost || ''}</p>
					<CurrencyIcon type={'primary'}></CurrencyIcon>
				</div>
				<Button
					extraClass={styles.order_bar_button}
					htmlType={'button'}
					type={'primary'}
					size={'large'}
					onClick={handleClick}>
					{status === 'loading' ? 'Создание заказа...' : 'Оформить заказ'}
				</Button>
			</div>
		</>
	);
};

OrderBar.propTypes = {
	totalCost: PropTypes.number,
};
