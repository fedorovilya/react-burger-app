import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orderBar.module.css';
import {OrderDetails} from '@components/burger-constructor/orderDetails';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {createOrderRequest} from '@services/slice/orderSlice';
import {Modal} from "@components/modal/modal";
import {useModal} from "../../hooks/useModal";

export const OrderBar = ({orderItems, totalCost}) => {
	const dispatch = useDispatch();
	const {isModalOpen, openModal, closeModal} = useModal();
	const {order, status} = useSelector((state) => state.order);

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
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails orderId={order?.number}/>
				</Modal>
			)
			}
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
