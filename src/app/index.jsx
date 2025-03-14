import {clsx} from 'clsx';
import {useState} from 'react';
import s from './app.module.scss';
import {AppHeader} from "@components/app-header/app-header.jsx";
import {BurgerIngredients} from "@components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "@components/burger-constructor/burger-constructor";

export const App = () => {
	return (
		<div className='page'>
			<AppHeader/>
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				gap: "40px"
			}}>
				<BurgerIngredients></BurgerIngredients>
				<BurgerConstructor></BurgerConstructor>
			</div>
		</div>
	);
};
