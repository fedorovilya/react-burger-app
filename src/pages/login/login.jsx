import {AppHeader} from "@components/app-header/appHeader";
import styles from "./login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const Login = () => {
	const REGISTER_LINK = '/register';
	const FORGOT_LINK = '/forgot-password';

	const [email, setEmail] = useState()
	const onEmailChange = e => {
		setEmail(e.target.value)
	}

	const [password, setPassword] = useState()
	const onPasswordChange = e => {
		setPassword(e.target.value)
	}

	return (
		<div className='page'>
			<AppHeader/>
			<div className={`pt-30 ${styles.flex}`}>
				<div className={styles.flex_fields}>
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
					<Button htmlType={"button"} size={"large"}>Войти</Button>
				</div>
				<div className={styles.flex_links}>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?</p>
						<Link to={REGISTER_LINK}>Зарегистрироваться</Link>
					</div>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</p>
						<Link to={REGISTER_LINK}>Восстановить пароль</Link>
					</div>
				</div>
			</div>
		</div>

	)
}