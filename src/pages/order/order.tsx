import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@services/store';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { AppHeader } from '@components/app-header/appHeader';
import {OrderInfo} from "@components/order-info/orderInfo";
import {getOrder, setOrderInfo} from "@services/slice/orderSlice";

export const Order = () => {
	const searchParams = new URLSearchParams(location.search);
	const isModal = searchParams.get('modal') === 'true';
	const isPrivate = searchParams.get('private') === 'true';
	const { number } = useParams<{ number: string }>();
	const orderNumber = Number(number);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {data: feedData} = useAppSelector((state) => state.feed);
	const {data: userFeedData} = useAppSelector((state) => state.userFeed);
	const order = useAppSelector((state) => state.order.orderInfo);

	useEffect(() => {
		if (isModal) {
			navigate(`${isPrivate ? '/profile/orders' : '/feed'}?reopenModal=true&reopenNumber=${number}`, { replace: true });
		}
		if (!order && number) {
			let orderData = feedData?.orders.find(order => order.number === orderNumber);
			if (!orderData) {
				orderData = userFeedData?.orders.find(order => order.number === orderNumber);
				if (orderData) {
					dispatch(setOrderInfo(orderData));
				} else {
					dispatch(getOrder(orderNumber));
				}
			}
		}
	}, [number, orderNumber, isModal]);

	if (!order) {
		return <div>Нет данных по указанному заказу</div>;
	}

	return (
		<div>
			<AppHeader />
			<div className={'pt-20'}>
				<OrderInfo order={order}/>
			</div>
		</div>
	);
};
