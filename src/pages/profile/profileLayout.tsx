import styles from './profileLayout.module.css';
import { AppHeader } from '@components/app-header/appHeader';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
	BASE_WSS_HOST,
	LOGOUT_LINK,
	ORDERS_HISTORY_LINK,
	PROFILE_LINK,
} from '../../const/const';
import React, { useEffect } from 'react';
import { LogoutLink } from '@components/logout-link/logoutLink';
import { useAppDispatch } from '@services/store';
import { SOCKET_CONNECT, SOCKET_DISCONNECT } from '@services/socketMiddleware';

export const ProfileLayout = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (location.pathname === ORDERS_HISTORY_LINK) {
			dispatch({
				type: SOCKET_CONNECT,
				payload: { isPrivate: true, url: `${BASE_WSS_HOST}orders` },
			});
			return () => {
				dispatch({
					type: SOCKET_DISCONNECT,
				});
			};
		}
	}, [dispatch, location]);

	return (
		<>
			<AppHeader />
			<div className='pt-30' style={{ paddingLeft: '25%' }}>
				<div className={styles.flex}>
					<div className={styles.flex_links}>
						<Link to={PROFILE_LINK} className={'mt-4 mb-4'}>
							<p
								className={
									location.pathname === PROFILE_LINK
										? 'text text_type_main-medium'
										: 'text text_type_main-medium text_color_inactive'
								}>
								Профиль
							</p>
						</Link>
						<Link to={ORDERS_HISTORY_LINK} className={'mt-4 mb-4'}>
							<p
								className={
									location.pathname === ORDERS_HISTORY_LINK
										? 'text text_type_main-medium'
										: 'text text_type_main-medium text_color_inactive'
								}>
								История заказов
							</p>
						</Link>
						<LogoutLink>
							<p
								className={
									location.pathname === LOGOUT_LINK
										? 'text text_type_main-medium'
										: 'text text_type_main-medium text_color_inactive'
								}>
								Выход
							</p>
						</LogoutLink>
						<p
							className={'pt-20 text text_type_main-small text_color_inactive'}
							style={{ opacity: '40%' }}>
							{location.pathname === PROFILE_LINK
								? 'В этом разделе вы можете изменить свои персональные данные'
								: 'В этом разделе вы можете просмотреть свою историю заказов'}
						</p>
					</div>
					<Outlet />
				</div>
			</div>
		</>
	);
};
