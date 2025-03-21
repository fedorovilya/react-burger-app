import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orderBar.module.css';
import {useState} from "react";
import {OrderModal} from "@components/modal/orderModal";

export const OrderBar = ({totalCost}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [orderId, setOrderId] = useState();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleClick = () => {
		openModal()
		setOrderId('034536');
	}

	return (
		<>
			<OrderModal
				isOpen={isModalOpen}
				onClose={closeModal}
				orderId={orderId}
			>
			</OrderModal>
			<div className={`pr-4 ${styles.order_bar_flex}`}>
				<div className={styles.order_bar_cost}>
					<p className='text text_type_digits-medium'>{totalCost}</p>
					<CurrencyIcon type={'primary'}></CurrencyIcon>
				</div>
				<Button
					extraClass={styles.order_bar_button}
					htmlType={'button'}
					type={'primary'}
					size={'large'}
					onClick={handleClick}
				>
					Оформить заказ
				</Button>
			</div>
		</>
	);
};
