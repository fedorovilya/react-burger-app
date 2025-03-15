import {AppHeader} from "@components/app-header/appHeader.jsx";
import {BurgerIngredients} from "@components/burger-ingredients/burgerIngredients";
import {BurgerConstructor} from "@components/burger-constructor/burgerConstructor";
import {useEffect} from "react";
import icon from "@ya.praktikum/react-developer-burger-ui-components/dist/gatsby-theme-docz/favicon.png";

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
