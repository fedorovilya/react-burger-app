import { UserData } from '@services/slice/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_LINK } from '../../const/const';
import React from 'react';
import { useAppSelector } from '@services/store';

interface Props {
	element: React.ReactNode;
	isPrivate?: boolean;
}

export const ProtectedRouteElement = ({ isPrivate, element }: Props) => {
	const location = useLocation();
	const user: UserData = useAppSelector((state) => state.user);

	if (user.status === 'loading') {
		return <p>Пожалуйста, подождите...</p>;
	}

	if (user.isAuthorized && !isPrivate) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!user.isAuthorized && isPrivate) {
		return <Navigate to={LOGIN_LINK} state={{ from: location }} />;
	}

	return element;
};
