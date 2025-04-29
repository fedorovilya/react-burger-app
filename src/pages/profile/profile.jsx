import {AppHeader} from "@components/app-header/appHeader";
import styles from "./profile.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {Link} from "react-router-dom";

export const Profile = () => {
	const PROFILE_LINK = '/profile';
	const ORDERS_LINK = '/orders';
	const LOGOUT_LINK = '/logout';

	const [name, setName] = useState()
	const onNameChange = e => {
		setName(e.target.value)
	}

	const [login, setLogin] = useState()
	const onLoginChange = e => {
		setLogin(e.target.value)
	}

	const [password, setPassword] = useState()
	const onPasswordChange = e => {
		setPassword(e.target.value)
	}

	return (
		<div className='page'>
			<AppHeader/>
			<div className={`pt-30 ${styles.flex}`}>
				<div className={styles.flex_links}>
					<Link to={PROFILE_LINK} className={"mt-4 mb-4"}>
						<p
							className={
								window.location.pathname === PROFILE_LINK
									? 'text text_type_main-medium'
									: 'text text_type_main-medium text_color_inactive'
							}>
							Профиль
						</p>
					</Link>
					<Link to={ORDERS_LINK} className={"mt-4 mb-4"}>
						<p
							className={
								window.location.pathname === ORDERS_LINK
									? 'text text_type_main-medium'
									: 'text text_type_main-medium text_color_inactive'
							}>
							История заказов
						</p>
					</Link>
					<Link to={LOGOUT_LINK} className={"mt-4 mb-4"}>
						<p
							className={
								window.location.pathname === LOGOUT_LINK
									? 'text text_type_main-medium'
									: 'text text_type_main-medium text_color_inactive'
							}>
							Выход
						</p>
					</Link>
					<p className={"pt-20 text text_type_main-small text_color_inactive"} style={{opacity: "40%"}}>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				<div className={styles.flex_fields}>
					<EmailInput
						isIcon={true}
						size={"default"}
						placeholder={"Имя"}
						name={'name'}
						value={name}
						onChange={onNameChange}
					></EmailInput>
					<EmailInput
						isIcon={true}
						size={"default"}
						placeholder={"Логин"}
						name={'login'}
						value={login}
						onChange={onLoginChange}
					></EmailInput>
					<PasswordInput
						size={"default"}
						value={password}
						onChange={onPasswordChange}
						name="password"
						icon="EditIcon"
					></PasswordInput>
				</div>
			</div>
		</div>

	)
}