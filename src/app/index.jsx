import {AppHeader} from '@components/app-header/appHeader.jsx';
import {BurgerIngredients} from '@components/burger-ingredients/burgerIngredients';
import {BurgerConstructor} from '@components/burger-constructor/burgerConstructor';
import {useEffect, useState} from 'react';
import icon from '@assets/favicon.png';
import styles from './app.module.scss';

export const App = () => {
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
				<BurgerIngredients/>
				<BurgerConstructor></BurgerConstructor>
			</div>
		</div>
	);
};
