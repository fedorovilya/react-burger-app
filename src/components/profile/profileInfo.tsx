import styles from "./profileInfo.module.css";
import {useAppDispatch, useAppSelector} from "@services/store";
import {ChangeEvent, useState} from "react";
import {createUpdateUserRequest} from "@services/slice/userSlice";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfileInfo = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const [anyChanged, setAnyChanged] = useState(false);
	const [nameInputDisabled, setNameInputDisabled] = useState(true);

	const [name, setName] = useState(user.user?.name ?? '');
	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAnyChanged(e.target.value !== user.user?.name);
		setName(e.target.value);
	};

	const [login, setLogin] = useState(user.user?.email ?? '');
	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAnyChanged(e.target.value !== user.user?.email);
		setLogin(e.target.value);
	};

	const [password, setPassword] = useState('');
	const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAnyChanged(e.target.value !== '');
		setPassword(e.target.value);
	};

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(createUpdateUserRequest({
			email: login,
			name: name,
			password: password || undefined
		}));
	};

	const onCancelClick = () => {
		setAnyChanged(false);
		setName(user.user?.name ?? '');
		setLogin(user.user?.email ?? '');
		setPassword('');
	};

	if (user.status === 'loading') return <p>Loading...</p>;
	if (user.status === 'fail') return <p>{user.error}</p>;

	return (
		<form className={styles.flex_fields} onSubmit={onFormSubmit}>
			<Input icon={'EditIcon'} onIconClick={() => setNameInputDisabled(!nameInputDisabled)} type="text" size="default" placeholder="Имя" value={name} onChange={onNameChange} disabled={nameInputDisabled} />
			<EmailInput isIcon size="default" placeholder="Логин" value={login} onChange={onLoginChange} />
			<PasswordInput size="default" value={password} onChange={onPasswordChange} icon="EditIcon" />
			<div className={styles.flex}>
				{anyChanged && <Button htmlType="submit" size="medium">Сохранить</Button>}
				{anyChanged && (
					<Button htmlType="button" size="medium" type="secondary" onClick={onCancelClick}>
						Отменить
					</Button>
				)}
			</div>
		</form>
	);
}
