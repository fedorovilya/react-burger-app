import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orderBar.module.css';
import {OrderDetails} from '@components/burger-constructor/orderDetails';
import {createOrderRequest} from '@services/slice/orderSlice';
import {Modal} from "@components/modal/modal";
import {useModal} from "../../hooks/useModal";
import {useAppDispatch, useAppSelector} from "@services/store";
import {UserData} from "@services/slice/userSlice";
import {useNavigate} from "react-router-dom";
import {LOGIN_LINK} from "../../const/const";
import {clearList} from "@services/slice/burgerConstructorSlice";
import {useCallback, useEffect, useState} from "react";
import {OrderResponse} from "../../types/orderResponse";
import {AuthError} from "@utils/request";

interface Props {
	orderItems: String [],
	totalCost: number
}

export const OrderBar = ({orderItems, totalCost}: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {isModalOpen, openModal, closeModal} = useModal();
	const user: UserData = useAppSelector((state) => state.user);
	const {order, status} = useAppSelector((state) => state.order);

	const handleClick = async () => {
		if (!user.isAuthorized) {
			return navigate(LOGIN_LINK)
		}
		try {
			dispatch(
				createOrderRequest({
					ingredients: orderItems,
				})
			).unwrap;
		} catch (e) {
			if (e instanceof AuthError) {
				navigate(LOGIN_LINK);
			}
		}
		openModal();
	}

	return (
		<>
			{isModalOpen && order && order.number && (
				<Modal onClose={closeModal}>
					<OrderDetails orderId={order.number}/>
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
}
