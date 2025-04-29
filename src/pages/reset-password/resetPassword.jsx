import {AppHeader} from "@components/app-header/appHeader";
import styles from "./resetPassword.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const ResetPassword = () => {
	const LOGIN_LINK = '/login';

	const [code, setCode] = useState()
	const onCodeChange = e => {
		setCode(e.target.value)
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
					<p className={'text text_type_main-medium'}>Восстановление пароля</p>
					<PasswordInput
						size={"default"}
						value={password}
						onChange={onPasswordChange}
						name="password"
					></PasswordInput>
					<Input
						type={"text"}
						size={"default"}
						placeholder={"Введите код из письма"}
						name={'name'}
						value={code}
						onChange={onCodeChange}
					></Input>
					<Button htmlType={"button"} size={"large"}>Сохранить</Button>
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