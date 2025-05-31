import {AppHeader} from "@components/app-header/appHeader";
import styles from "@pages/constructor/constructor.module.css";
import {BurgerIngredients} from "@components/burger-ingredients/burgerIngredients";
import {BurgerConstructor} from "@components/burger-constructor/burgerConstructor";

export const Feed = () => {
	return (
		<div className='page'>
			<AppHeader />
			<div className={styles.flex}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</div>
	);
}
