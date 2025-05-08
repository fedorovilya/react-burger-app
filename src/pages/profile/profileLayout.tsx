import styles from './profileLayout.module.css';
import { AppHeader } from '@components/app-header/appHeader';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
	LOGOUT_LINK,
	ORDERS_HISTORY_LINK,
	PROFILE_LINK,
} from '../../const/const';
import React from 'react';
import { LogoutLink } from '@components/logout-link/logoutLink';

export const ProfileLayout = () => {
	const location = useLocation();

	return (
		<>
			<AppHeader />
			<div className='pt-30'>
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
							В этом разделе вы можете изменить свои персональные данные
						</p>
					</div>
					<Outlet />
				</div>
			</div>
		</>
	);
};
