import { AppHeader } from '@components/app-header/appHeader';
import styles from './feed.module.css';
import { FeedOrders } from '@components/feed/feedOrders';
import { FeedInfo } from '@components/feed/feedInfo';
import { useEffect } from 'react';
import { useAppDispatch } from '@services/store';
import { SOCKET_CONNECT, SOCKET_DISCONNECT } from '@services/socketMiddleware';
import { BASE_WSS_HOST } from '../../const/const';

export const Feed = () => {
	const dispatch = useAppDispatch();
	const BASE_API = process.env.BASE_WSS_URL || BASE_WSS_HOST;

	useEffect(() => {
		dispatch({
			type: SOCKET_CONNECT,
			payload: { isPrivate: false, url: `${BASE_API}orders/all` },
		});
		return () => {
			dispatch({
				type: SOCKET_DISCONNECT,
			});
		};
	}, [dispatch]);

	return (
		<div className='page'>
			<AppHeader />
			<div className={styles.flex}>
				<FeedOrders isPrivate={false} />
				<FeedInfo />
			</div>
		</div>
	);
};
