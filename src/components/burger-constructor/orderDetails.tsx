import styles from '@components/burger-constructor/orderDetails.module.css';
import icon from '@assets/iconOrderOk.png';

interface Props {
	orderId: number;
}
export const OrderDetails = ({ orderId }: Props) => {
	return (
		<div className={`${styles.flex} pt-10 pb-15`}>
			<p data-test='order_number' className='text text_type_digits-large'>
				{orderId}
			</p>
			<p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
			<img
				className='pt-15 pb-15'
				src={icon}
				alt='Заказ подтвержден'
				width={'120px'}
				height={'120px'}
			/>
			<p className='text text_type_main-small pt-8 pb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small text_color_inactive pt-2'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
