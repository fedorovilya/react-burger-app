import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderBar.module.css";

export const OrderBar = ({totalCost}) => {
	return (
		<div className={`pr-4 ${styles.order_bar_flex}`}>
			<div className={styles.order_bar_flex_cost}>
				<p className="text text_type_digits-medium">{totalCost}</p>
				<CurrencyIcon type={"primary"}></CurrencyIcon>
			</div>
			<Button extraClass={styles.order_bar_button} htmlType={"button"} type={"primary"} size={"large"}>
				Оформить заказ
			</Button>
		</div>
	)
}