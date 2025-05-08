import {AppHeader} from "@components/app-header/appHeader";
import styles from "./login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FORGOT_PASSWORD_LINK, REGISTER_LINK} from "../../const/const";
import {useAppDispatch, useAppSelector} from "@services/store";
import {createLoginRequest} from "@services/slice/userSlice";

export const Login = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.user);
	const from: string = location.state?.from?.pathname || '/';

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loginFailed, setLoginFailed] = useState(false);
	const [email, setEmail] = useState(String);
	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const [password, setPassword] = useState(String);
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const onLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(createLoginRequest({
					"email": email,
					"password": password,
				})
			).unwrap();
			if (!loginFailed) {
				navigate(from);
			}
		} catch (e: any) {
			console.log(e);
			if (e?.name === "AuthError") {
				console.log("AuthError");
				setLoginFailed(true);
				setEmail("123");
				setPassword("");
			}
			const errorMessage = e.message
				? `Ошибка входа в систему: ${e.message}`
				: e || 'Неожиданная ошибка';
			console.log(errorMessage);
		}
	}

	return (
		<div className='page'>
			<AppHeader/>
			<div className={`pt-30 ${styles.flex}`}>
				<form className={styles.flex_fields} onSubmit={onLoginSubmit}>
					<p className={'text text_type_main-medium'}>Вход</p>
					<EmailInput
						size={"default"}
						placeholder={"E-mail"}
						name={'email'}
						isIcon={false}
						value={email}
						onChange={onEmailChange}
					></EmailInput>
					<PasswordInput
						size={"default"}
						value={password}
						onChange={onPasswordChange}
						name="password"
					></PasswordInput>
					{user.error && !user.isAuthorized &&
						<p className={'text text_type_main-default text_color_inactive'}>Неверное имя пользователя или
							пароль</p>}
					<Button htmlType={"submit"} size={"large"}>Войти</Button>
				</form>
				<div className={styles.flex_links}>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?</p>
						<Link to={REGISTER_LINK}>Зарегистрироваться</Link>
					</div>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</p>
						<Link to={FORGOT_PASSWORD_LINK}>Восстановить пароль</Link>
					</div>
				</div>
			</div>
		</div>

	)
}
