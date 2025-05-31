import {useAppSelector} from "@services/store";
import style from "./feedOrders.module.css"
import {Order} from "../../types/order";
import {useMemo} from "react";

interface Props {
	isPrivate: boolean
}

export const FeedOrders = ({isPrivate}: Props) => {

	const testOrders: Order[] = [
		{
			ingredients: [
				"60d3463f7034a000269f45e7",
				"60d3463f7034a000269f45e9",
				"60d3463f7034a000269f45e8",
				"60d3463f7034a000269f45ea"
			],
			_id: "",
			status: 'done',
			number: 123243,
			createdAt: "2024-06-22T14:43:22.587Z",
			updatedAt: "2024-06-22T14:43:22.603Z",
			name: "Тестовый"
		},
		{
			ingredients: [
				"60d3463f7034a000269f45e7",
				"60d3463f7034a000269f45e9",
				"60d3463f7034a000269f45e8",
				"60d3463f7034a000269f45e8",
				"60d3463f7034a000269f45e8",
				"60d3463f7034a000269f45ea",
				"60d3463f7034a000269f45ea",
			],
			_id: "",
			status: 'done',
			number: 123,
			createdAt: "2021-06-23T14:43:22.587Z",
			updatedAt: "2021-06-23T14:43:22.603Z",
			name: "Вкуснотеево"

		}
	];

	const {ingredients, status, error} = useAppSelector(
		(state) => state.ingredients
	);

	const feedIngredientsList = useMemo(() => {
		const uniqueIngredientIds = new Set(testOrders.flatMap(order => order.ingredients));
		return ingredients?.filter(ingredient => uniqueIngredientIds.has(ingredient._id));
	}, [testOrders, ingredients])

	return (
		<>
			<p className={'pt-10 text text_type_main-large'}>Лента заказов</p>
			<ul className={style.orders_flex} id={"orders_cards_container"}>
				{testOrders?.map((order, index) => (
					<li className={style.order_element} key={index}>
						<div className={`pt-6 ${style.order_element_flex}`}>
							<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
								<p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
								<p className={'text text_type_main-default text_color_inactive'}>{order.createdAt}</p>
							</div>
							<p className={'text text_type_digits-default'}>{order.name}</p>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
