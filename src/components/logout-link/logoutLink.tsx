import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@services/store';
import { LOGIN_LINK, LOGOUT_LINK } from '../../const/const';
import React from 'react';
import { createLogoutRequest } from '@services/slice/userSlice';

interface Props {
	children: React.ReactNode;
}

export const LogoutLink = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = async (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault();
		let token = localStorage.getItem('refreshToken');
		if (token) {
			await dispatch(createLogoutRequest({ token }));
		}
		navigate(LOGIN_LINK);
	};
	return (
		<a
			href={LOGOUT_LINK}
			onClick={handleLogout}
			className={'mt-4 mb-4'}
			style={{ textDecoration: 'none' }}>
			{children}
		</a>
	);
};
