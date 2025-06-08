import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import {CONSTRUCTOR_LINK, FEED_LINK, PROFILE_LINK} from '../../const/const';

export const AppHeader = () => {
	const location = useLocation();
	return (
		<header className={styles.header}>
			<div className={styles.header_flex}>
				<div className={`p-2 ${styles.header_flex_left}`}>
					<Link to={CONSTRUCTOR_LINK} className={'p-4'}>
						<div className={`ml-2 ${styles.header_link}`}>
							<BurgerIcon type={'primary'}></BurgerIcon>
							<p
								className={
									location.pathname === CONSTRUCTOR_LINK
										? 'text text_type_main-default'
										: 'text text_type_main-default text_color_inactive'
								}>
								Конструктор
							</p>
						</div>
					</Link>
					<Link to={FEED_LINK} className={'p-4'}>
						<div className={`ml-2 ${styles.header_link}`}>
							<ListIcon type={'primary'}></ListIcon>
							<p
								className={
									location.pathname === FEED_LINK
										? 'text text_type_main-default'
										: 'text text_type_main-default text_color_inactive'
								}>
								Лента заказов
							</p>
						</div>
					</Link>
				</div>
				<Link
					to={CONSTRUCTOR_LINK}
					className={`pt-2 ${styles.header_flex_logo}`}>
					<Logo></Logo>
				</Link>
				<Link to={PROFILE_LINK} className={'p-4'}>
					<div className={`ml-2 ${styles.header_link}`}>
						<ProfileIcon type={'primary'}></ProfileIcon>
						<p
							className={
								location.pathname.startsWith(PROFILE_LINK)
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
