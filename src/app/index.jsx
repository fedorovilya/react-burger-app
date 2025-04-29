import {AppHeader} from '@components/app-header/appHeader.jsx';
import {BurgerIngredients} from '@components/burger-ingredients/burgerIngredients';
import {BurgerConstructor} from '@components/burger-constructor/burgerConstructor';
import {useEffect} from 'react';
import icon from '@assets/favicon.png';
import styles from './app.module.scss';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Profile} from "@pages/profile/profile";
import {ResetPassword} from "@pages/reset-password/resetPassword";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Constructor} from "@pages/constructor/constructor";
import {Login} from "@pages/login/login";
import {Register} from "@pages/register/register";
import {ForgotPassword} from "@pages/forgot-password/forgotPassword";

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
			<Router>
				<Routes>
					<Route path="/" element={<Constructor/>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="/forgot-password" element={<ForgotPassword/>}/>
					<Route path="/reset-password" element={<ResetPassword/>}/>
				</Routes>
			</Router>
		</DndProvider>
	);
};
