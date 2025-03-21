import {AppHeader} from '@components/app-header/appHeader.jsx';
import {BurgerIngredients} from '@components/burger-ingredients/burgerIngredients';
import {BurgerConstructor} from '@components/burger-constructor/burgerConstructor';
import {useEffect, useState} from 'react';
import icon from '@assets/favicon.png';
import styles from './app.module.scss';
import {API_INGREDIENTS_ENDPOINT} from "../const/const";
import PropTypes from "prop-types";
import {ingredientsProps} from "@utils/props";

export const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	// В dev со StrictMode выполняется 2 раза. В prod режиме один раз
	useEffect(() => {
		if (ingredients.length > 0 || loading) return;
		setLoading(true);

		const fetchData = async () => {
			fetch(API_INGREDIENTS_ENDPOINT)
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						setIngredients(data.data);
						setLoading(false);
						setHasError(false);
					}
				})
				.catch(e => {
					setHasError(true);
					setLoading(false);
					alert(`Не удалось получить данные об ингредиентах с сервера: ${e.message}`);
				})
		}
		fetchData();
	}, []);

	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'icon';
		link.href = icon;
		link.type = 'image/png';
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, []);

	return (
		<div className='page'>
			<AppHeader/>
			<div className={styles.flex}>
				<BurgerIngredients ingredients={ingredients}></BurgerIngredients>
				<BurgerConstructor></BurgerConstructor>
			</div>
		</div>
	);
};
