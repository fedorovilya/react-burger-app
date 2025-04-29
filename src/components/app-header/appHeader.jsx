import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';
import {Link} from "react-router-dom";

export const AppHeader = () => {
	const CONSTRUCTOR_LINK = '/';
	const ORDER_LIST_LINK = '/orders';
	const PROFILE_LINK = '/profile';

	return (
		<header className={styles.header}>
			<div className={styles.header_flex}>
				<div className={`p-2 ${styles.header_flex_left}`}>
					<Link to={CONSTRUCTOR_LINK} className={'p-4'}>
						<div className={`ml-2 ${styles.header_link}`}>
							<BurgerIcon type={'primary'}></BurgerIcon>
							<p
								className={
									window.location.pathname === CONSTRUCTOR_LINK
										? 'text text_type_main-default'
										: 'text text_type_main-default text_color_inactive'
								}>
								Конструктор
							</p>
						</div>
					</Link>
					<Link to={ORDER_LIST_LINK} className={'p-4'}>
						<div className={`ml-2 ${styles.header_link}`}>
							<ListIcon type={'primary'}></ListIcon>
							<p
								className={
									window.location.pathname === ORDER_LIST_LINK
										? 'text text_type_main-default'
										: 'text text_type_main-default text_color_inactive'
								}>
								Лента заказов
							</p>
						</div>
					</Link>
				</div>
				<Link to={CONSTRUCTOR_LINK} className={`p-4 ${styles.header_flex_logo}`}>
					<Logo></Logo>
				</Link>
				<Link to={PROFILE_LINK} className={'p-4'}>
					<div className={`ml-2 ${styles.header_link}`}>
						<ProfileIcon type={'primary'}></ProfileIcon>
						<p
							className={
								window.location.pathname === PROFILE_LINK
									? 'text text_type_main-default'
									: 'text text_type_main-default text_color_inactive'
							}>
							Личный кабинет
						</p>
					</div>
				</Link>
			</div>
		</header>
	);
};
