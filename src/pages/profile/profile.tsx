import {AppHeader} from "@components/app-header/appHeader";
import styles from "./profile.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import {LOGOUT_LINK, ORDERS_LINK, PROFILE_LINK} from "../../const/const";
import {UserData} from "@services/slice/userSlice";
import {useAppSelector} from "@services/store";
import {LogoutLink} from "@components/logout-link/logoutLink";

export const Profile = () => {
	const user: UserData = useAppSelector((state) => state.user);

	const [name, setName] = useState(user.user?.name ?? String)
	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const [login, setLogin] = useState(user.user?.email ?? String)
	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value)
	}

	const [password, setPassword] = useState(String)
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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
					<LogoutLink>
						<p
							className={
								window.location.pathname === LOGOUT_LINK
									? 'text text_type_main-medium'
									: 'text text_type_main-medium text_color_inactive'
							}>
							Выход
						</p>
					</LogoutLink>
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