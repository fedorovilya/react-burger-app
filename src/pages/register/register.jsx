import {AppHeader} from "@components/app-header/appHeader";
import styles from "./register.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const Register = () => {
	const LOGIN_LINK = '/login';

	const [name, setName] = useState()
	const onNameChange = e => {
		setName(e.target.value)
	}

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
					<p className={'text text_type_main-medium'}>Регистрация</p>
					<Input
						type={"text"}
						size={"default"}
						placeholder={"Имя"}
						name={'name'}
						value={name}
						onChange={onNameChange}
					></Input>
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
					<Button htmlType={"button"} size={"large"}>Зарегистрироваться</Button>
				</div>
				<div className={styles.flex_links}>
					<div className={styles.flex_links__item}>
						<p className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?</p>
						<Link to={LOGIN_LINK}>Войти</Link>
					</div>
				</div>
			</div>
		</div>

	)
}