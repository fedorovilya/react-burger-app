import {useAppDispatch, useAppSelector} from "@services/store";
import style from "./feedOrders.module.css"
import {FeedOrder} from "../../types/feedOrder";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useModal} from "../../hooks/useModal";
import {getOrder, setOrderInfo} from "@services/slice/orderSlice";
import {Modal} from "@components/modal/modal";
import {OrderInfo} from "@components/order-info/orderInfo";
import {useEffect} from "react";

interface Props {
	isPrivate?: boolean
}

export const FeedOrders = ({isPrivate = false}: Props) => {
	const dispatch = useAppDispatch();
	const {isModalOpen, openModal, closeModal} = useModal();

	const searchParams = new URLSearchParams(location.search);
	const reopenModal = searchParams.get('reopenModal') === 'true';
	const reopenNumber = searchParams.get('reopenNumber');

	const handleOnClick = (order: FeedOrder) => {
		dispatch(setOrderInfo(order));
		const url = isPrivate
			? `/profile/orders/${order.number}`
			: `/feed/${order.number}`;
		window.history.pushState({}, '', `${url}?modal=true&private=${isPrivate}`);
		openModal();
	};
	const handleOnClose = () => {
		closeModal();
		dispatch(setOrderInfo(null));
		window.history.pushState({}, '', `${isPrivate ? '/profile/orders' : '/feed'}`);
	};

	const {data: feedData, status: ordersStatus} = isPrivate
		? useAppSelector((state) => state.userFeed)
		: useAppSelector((state) => state.feed)

	const {ingredients} = useAppSelector(
		(state) => state.ingredients
	);
	const order = useAppSelector((state) => state.order.orderInfo);


	const MAX_VISIBLE = 5;

	const getFormattedDate = (isoString: string): string => {
		const date = new Date(isoString);
		const today = new Date();

		const isToday =
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();

		const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

		return `${isToday ? 'сегодня' : date.toLocaleDateString([], {day: 'numeric', month: 'long'})}, ${timeString}`;
	}

	const getOrderSum = (order: FeedOrder) => {
		if (ingredients !== null) {
			const orderIngredients = order.ingredients.map(id => ingredients.find(ing => ing._id === id));
			const bun = orderIngredients.find(ingredient => ingredient?.type === 'bun');

			return orderIngredients.reduce((sum, element) => {
				return sum + (element?.price || 0);
			}, 0) + (bun?.price || 0);
		}
	}

	const getIngredientsStack = (order: FeedOrder) => {
		if (ingredients) {
			const orderIngredients = order.ingredients.map(id => ingredients.find(ing => ing._id === id));

			const hasOverflow = orderIngredients.length > MAX_VISIBLE;
			const visibleIngredients = orderIngredients.slice(0, MAX_VISIBLE);
			const overflowCount = orderIngredients.length - MAX_VISIBLE;

			return (
				<div className={style.row_flex}>
					<div className={style.imageStack}>
						{visibleIngredients && visibleIngredients.map((ingredient, index) => (
							<div
								className={style.imageWrapper}
								key={index}
								style={{
									left: `${index * 40}px`,
									zIndex: visibleIngredients.length - index,
								}}
							>
								<img className={style.imageWrapper_img} src={ingredient?.image}
									 alt={`ingredient-${index}`}/>
							</div>
						))}
						{hasOverflow && (
							<div
								className={style.imageWrapper}
								style={{
									left: `${MAX_VISIBLE * 40 + 20}px`,
									zIndex: 0,
								}}
							>
								<img className={`${style.imageWrapper_img} ${style.imageWrapper_img_overflow}`}
									 src={orderIngredients[MAX_VISIBLE]?.image} alt="overflow"/>
								<span className={style.overflowText}>+{overflowCount}</span>
							</div>
						)}
					</div>
					<div className={style.order_cost}>
						<p className='text text_type_digits-default'>{getOrderSum(order) || ''}</p>
						<CurrencyIcon type={'primary'}></CurrencyIcon>
					</div>
				</div>
			)
		}
	}

	const getStatusText = (order: FeedOrder) => {
		if (order.status === 'created') {
			return <p className={'text text_type_main-small'}>Создан</p>;
		} else if (order.status === 'pending') {
			return <p className={'text text_type_main-small'}>Готовится</p>;
		} else return <p className={'text text_type_main-small'} style={{color: "#00CCCC"}}>Готов</p>;
	}

	useEffect(() => {
		if (!order) {
			dispatch(getOrder(Number(reopenNumber)));
			return;
		}
		if (reopenModal && reopenNumber) {
			const timeoutId = setTimeout(async () => {
				handleOnClick(order);
			}, 500);
			return () => clearTimeout(timeoutId);
		}
	}, [searchParams, reopenModal, reopenNumber, handleOnClick, order]);

	return (
		<>
			{order && isModalOpen && (
				<Modal onClose={handleOnClose}>
					<OrderInfo order={order}/>
				</Modal>
			)}
			<div className={style.flex}>
				{!isPrivate && <p className={'pt-10 pb-10 text text_type_main-large'}>Лента заказов</p>}
				{feedData && ordersStatus === 'success' &&
					<ul className={style.orders_flex} id={"orders_cards_container"}>
						{feedData.orders?.map((order, index) => (
							<li className={style.order_element} style={{cursor: 'pointer'}} key={index} onClick={() => handleOnClick(order)}>
								<div className={style.order_element_flex}>
									<div className={style.row_flex}>
										<p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
										<p className={'text text_type_main-default text_color_inactive'}>{getFormattedDate(order.createdAt)}</p>
									</div>
									<p className={'text text_type_main-medium'}>{order.name}</p>
									<p className={'text text_type_main-medium'}>{getStatusText(order)}</p>
									{getIngredientsStack(order)}
								</div>
							</li>
						))}
					</ul>
				}
			</div>
		</>
	)
}
