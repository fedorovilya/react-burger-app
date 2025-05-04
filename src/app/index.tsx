import {useEffect} from 'react';
import icon from '@assets/favicon.png';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Profile} from "@pages/profile/profile";
import {ResetPassword} from "@pages/reset-password/resetPassword";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Constructor} from "@pages/constructor/constructor";
import {Login} from "@pages/login/login";
import {Register} from "@pages/register/register";
import {ForgotPassword} from "@pages/forgot-password/forgotPassword";
import {NotFound404} from "@pages/404/notFound404";
import {ProtectedRouteElement} from "@components/protected-route-element/protectedRouteElement"

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
					<Route path="/profile" element={<ProtectedRouteElement isPrivate element={<Profile/>}/>}/>
					<Route path="/login" element={<ProtectedRouteElement element={<Login/>}/>}/>
					<Route path="/register" element={<ProtectedRouteElement element={<Register/>}/>}/>
					<Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword/>}/>}/>
					<Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword/>}/>}/>
					<Route path="*" element={<NotFound404/>}/>
				</Routes>
			</Router>
		</DndProvider>
	);
};
