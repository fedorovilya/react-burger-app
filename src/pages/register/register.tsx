import {AppHeader} from "@components/app-header/appHeader";
import styles from "./register.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_LINK, CONSTRUCTOR_LINK} from "../../const/const";
import {createRegisterRequest} from "@services/slice/userSlice";
import {useAppDispatch} from "@services/store";

export const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [name, setName] = useState(String)
	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const [email, setEmail] = useState(String)
	const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const [password, setPassword] = useState(String)
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			dispatch(createRegisterRequest({
					"email": email,
					"password": password,
					"name": name
				})
			);
			navigate(CONSTRUCTOR_LINK);
		} catch (error: any) {
			const errorMessage = error.message
				? `Ошибка регистрации: ${error.message}`
				: error || 'Неожиданная ошибка';
			console.log(errorMessage);
		}
	}

	return (
		<div className='page'>
			<AppHeader/>
			<div className={`pt-30 ${styles.flex}`}>
				<form className={styles.flex_fields} onSubmit={onRegisterSubmit}>
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
					<Button htmlType={"submit"} size={"large"}>Зарегистрироваться</Button>
				</form>
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