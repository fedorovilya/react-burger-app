import { AppHeader } from '@components/app-header/appHeader';
import styles from './notFound404.module.css';
import { Link } from 'react-router-dom';
import page404 from '@assets/404.png';
import { CONSTRUCTOR_LINK } from '../../const/const';

export const NotFound404 = () => {
	return (
		<div className='page'>
			<AppHeader />
			<div className={`pt-30 ${styles.flex}`}>
				<img alt='page not found' src={page404} width={200} height={200} />
				<p className={'text text_type_main-medium'}>Страница не найдена (((</p>
				<div className={styles.flex_links__item}>
					<Link to={CONSTRUCTOR_LINK}>
						<p className={'text text_type_main-default text_color_inactive'}>
							Перейти на главную страницу?
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};
