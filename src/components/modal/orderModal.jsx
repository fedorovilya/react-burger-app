import {Modal} from "@components/modal/modal";
import styles from "@components/modal/orderModal.module.css";
import icon from "@assets/iconOrderOk.png";
import PropTypes from "prop-types";

export const OrderModal = ({ isOpen, onClose, orderId }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={`${styles.flex} pt-10 pb-15`}>
				<p className='text text_type_digits-large'>{orderId}</p>
				<p className='text text_type_main-medium pt-8'>идентификатор заказа</p>
				<img
					className='pt-15 pb-15'
					src={icon}
					alt='Избображение'
					width={'120px'}
					height={'120px'}
				/>
				<p className='text text_type_main-small pt-8 pb-2'>Ваш заказ начали готовить</p>
				<p className='text text_type_main-small text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
			</div>
		</Modal>
	)
};

OrderModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	orderId: PropTypes.string,
}