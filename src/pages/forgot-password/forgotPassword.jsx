import {AppHeader} from "@components/app-header/appHeader";
import styles from "./forgotPassword.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const ForgotPassword = () => {
	const LOGIN_LINK = '/login';

	const [email, setEmail] = useState()
	const onEmailChange = e => {
		setEmail(e.target.value)
	}

	return (
		<div className='page'>
			<AppHeader/>
			<div className={styles.flex}>
				<div className={styles.flex_fields}>
					<p className={'text text_type_main-medium pt-10'}>Восстановление пароля</p>
					<EmailInput
						size={"default"}
						placeholder={"Укажите e-mail"}
						name={'email'}
						isIcon={false}
						value={email}
						onChange={onEmailChange}
					></EmailInput>
					<Button htmlType={"button"} size={"large"}>Восстановить</Button>
				</div>
				<div className={styles.flex_links}>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</p>
						<Link to={LOGIN_LINK}>Войти</Link>
					</div>
				</div>
			</div>
		</div>

	)
}