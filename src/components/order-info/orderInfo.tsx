import style from './orderInfo.module.css';
import { useAppSelector } from '@services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FeedOrder } from '../../types/feedOrder';

interface Props {
	order: FeedOrder;
}

export const OrderInfo = ({ order }: Props) => {
	const { ingredients, status, error } = useAppSelector(
		(state) => state.ingredients
	);

	const getFormattedDate = (isoString: string): string => {
		const date = new Date(isoString);
		const today = new Date();

		const isToday =
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();

		const timeString = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});

		return `${
			isToday
				? 'сегодня'
				: date.toLocaleDateString([], { day: 'numeric', month: 'long' })
		}, ${timeString}`;
	};

	const getOrderSum = (order: FeedOrder) => {
		if (ingredients !== null) {
			const orderIngredients = order.ingredients.map((id) =>
				ingredients.find((ing) => ing._id === id)
			);
			const bun = orderIngredients.find(
				(ingredient) => ingredient?.type === 'bun'
			);

			return (
				orderIngredients.reduce((sum, element) => {
					return sum + (element?.price || 0);
				}, 0) + (bun?.price || 0)
			);
		}
	};

	const getStatusText = (order: FeedOrder) => {
		if (order.status === 'created') {
			return <p className={'pt-3 text text_type_main-small'}>Создан</p>;
		} else if (order.status === 'pending') {
			return <p className={'pt-3 text text_type_main-small'}>Готовится</p>;
		} else
			return (
				<p
					className={'pt-3 text text_type_main-small'}
					style={{ color: '#00CCCC' }}>
					Выполнен
				</p>
			);
	};

	const getIngredientsList = (order: FeedOrder) => {
		if (ingredients !== null) {
			const ingredientCountMap = order.ingredients.reduce(
				(map, id) => new Map(map).set(id, (map.get(id) || 0) + 1),
				new Map<string, number>()
			);

			return (
				<ul className={style.ingredients_flex}>
					{Array.from(ingredientCountMap).map(([id, count]) => {
						const ingredient = ingredients.find((ing) => ing._id === id);
						return (
							<li
								className={style.ingredient_row}
								key={`order-ingredient-${id}`}>
								<div className={style.imageWrapper}>
									<img
										className={style.imageWrapper_img}
										src={ingredient?.image}
										alt={`ingredient-order-${id}`}
									/>
								</div>
								<p
									className={'text text_type_main-default'}
									style={{ flex: 1 }}>
									{ingredient?.name}
								</p>
								<p className={'text text_type_digits-default'}>
									{ingredient?.type === 'bun'
										? `2 x ${ingredient.price}`
										: `${count} x ${ingredient?.price}`}
								</p>
								{<CurrencyIcon type={'primary'} />}
							</li>
						);
					})}
				</ul>
			);
		}
	};

	return (
		<div className={style.flex}>
			<p
				className={'text text_type_digits-medium'}
				style={{ alignSelf: 'center' }}>
				#{order.number}
			</p>
			<p className={'pt-10 text text_type_main-medium'}>{order.name}</p>
			{getStatusText(order)}
			<p className={'pt-15 pb-6 text text_type_main-medium'}>Состав:</p>
			{getIngredientsList(order)}
			<div className={`pt-10 ${style.footer_flex}`}>
				<p className={'text text_type_main-default text_color_inactive'}>
					{getFormattedDate(order.createdAt)}
				</p>
				<p className={'text text_type_digits-default'}>
					{getOrderSum(order)}
					{<CurrencyIcon type='primary' />}
				</p>
			</div>
		</div>
	);
};
