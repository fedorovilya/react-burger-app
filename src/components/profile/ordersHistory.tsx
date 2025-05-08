import styles from "./ordersHistory.module.css";
import page404 from "@assets/404.png";

export const OrdersHistory = () => {
	return (
		<div className={styles.flex_fields}>
			<img alt="page not found" src={page404} width={200} height={200} />
		</div>
	);
};
