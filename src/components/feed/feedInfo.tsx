import styles from "./feedInfo.module.css";
import {useAppSelector} from "@services/store";

interface FeedColumnProps {
	orderNumbers: number[];
	title: string;
	isDone?: boolean
}

interface CounterBlockProps {
	title: string;
	count: number;
}

export const FeedInfo = () => {
	const {data, status} = useAppSelector(
		(state) => state.feed
	);

	const FeedColumn = ({orderNumbers, title, isDone = false}: FeedColumnProps) => {
		return (
			<div className={`pt-30 ${styles.info_column}`}>
				<h3 className={'text text_type_main-medium'}>{title}:</h3>
				<ul className={`pt-6  ${styles.info_list}`}>
					{orderNumbers.map((item, index) => (
						<li
							className={'text text_type_digits-default'}
							style={{color: isDone ? '#00cccc' : '#F2F2F3'}}
							key={index}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		)
	};

	const CounterBlock = ({title, count}: CounterBlockProps) => {
		return (
			<div>
				<h3 className={`text text_type_main-medium`}>{title}</h3>
				<p className={`text text_type_digits-large ${styles.glow_effect}`}>{count}</p>
			</div>
		)
	}

	const doneOrders: number[] = data?.orders.filter(order => order.status === 'done').map(order => order.number).slice(0, 16) || [];
	const pendingOrders: number[] = data?.orders.filter(order => order.status === 'pending').map(order => order.number).slice(0, 16) || [];
	const total = data?.total;
	const totalToday = data?.totalToday;

	return (
		(status === 'success' && data && total && totalToday) && (
			<section style={{display: "flex", flexDirection: "column", gap: "60px", justifyContent: "flex-start"}}>
				<div className={styles.info_columns}>
					<FeedColumn orderNumbers={doneOrders} title={'Готовы'} isDone/>
					<FeedColumn orderNumbers={pendingOrders} title={'В работе'}/>
				</div>
				<CounterBlock title={'Выполнено за все время:'} count={total}/>
				<CounterBlock title={'Выполнено за сегодня:'} count={totalToday}/>
			</section>
		)
	)
}
