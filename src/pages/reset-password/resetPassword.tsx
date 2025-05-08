import { AppHeader } from '@components/app-header/appHeader';
import styles from './resetPassword.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_LINK, LOGIN_LINK } from '../../const/const';
import { request } from '@utils/request';

export const ResetPassword = () => {
	const params = new URLSearchParams(location.search);
	const forgotVisited = params.get('visited') === 'true';
	const navigate = useNavigate();

	const [token, setToken] = useState(String);
	const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const [password, setPassword] = useState(String);
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onResetSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await request('password-reset/reset', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: password,
					token: token,
				}),
			});
			navigate(LOGIN_LINK, { replace: true });
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка сброса пароля: ${error.message}`
				: error || 'Неожиданная ошибка';
			console.log(errorMessage);
		}
	};

	return forgotVisited ? (
		<div className='page'>
			<AppHeader />
			<div className={`pt-30 ${styles.flex}`}>
				<form className={styles.flex_fields} onSubmit={onResetSubmit}>
					<p className={'text text_type_main-medium'}>Восстановление пароля</p>
					<PasswordInput
						size={'default'}
						value={password}
						onChange={onPasswordChange}
						name='password'></PasswordInput>
					<Input
						type={'text'}
						size={'default'}
						placeholder={'Введите код из письма'}
						name={'token'}
						value={token}
						onChange={onTokenChange}></Input>
					<Button htmlType={'submit'} size={'large'}>
						Сохранить
					</Button>
				</form>
				<div className={styles.flex_links}>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>
							Вспомнили пароль?
						</p>
						<Link to={LOGIN_LINK}>Войти</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Navigate to={FORGOT_PASSWORD_LINK} />
	);
};
