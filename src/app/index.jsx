import { AppHeader } from '@components/app-header/appHeader.jsx';
import { BurgerIngredients } from '@components/burger-ingredients/burgerIngredients';
import { BurgerConstructor } from '@components/burger-constructor/burgerConstructor';
import { useEffect } from 'react';
import icon from '@assets/favicon.png';
import styles from './app.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
		<DndProvider backend={HTML5Backend}>
			<div className='page'>
				<AppHeader />
				<div className={styles.flex}>
					<BurgerIngredients/>
					<BurgerConstructor/>
				</div>
			</div>
		</DndProvider>
	);
};
