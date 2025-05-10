import { AppHeader } from '@components/app-header/appHeader';
import styles from './forgotPassword.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { request } from '@utils/request';
import { LOGIN_LINK, RESET_PASSWORD_LINK } from '../../const/const';

export const ForgotPassword = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState(String);
	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onForgotSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await request('password-reset', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
				}),
			});
			navigate(`${RESET_PASSWORD_LINK}?visited=true`, { replace: true });
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка запроса на сброс пароля: ${error.message}`
				: error || 'Неожиданная ошибка';
			console.log(errorMessage);
		}
	};

	return (
		<div className='page'>
			<AppHeader />
			<div className={styles.flex}>
				<form className={styles.flex_fields} onSubmit={onForgotSubmit}>
					<p className={'text text_type_main-medium pt-10'}>
						Восстановление пароля
					</p>
					<EmailInput
						size={'default'}
						placeholder={'Укажите e-mail'}
						name={'email'}
						isIcon={false}
						value={email}
						onChange={onEmailChange}></EmailInput>
					<Button htmlType={'submit'} size={'large'}>
						Восстановить
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
	);
};
