import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientCard = ({item, count, index}) => {
	return (
		<li id={`ingredient-${index}`}
			style={{
				display: "flex",
				flexDirection: "column",
				height: "208px", width: "272px",
				justifyContent: "flex-start",
				alignItems: "center"
			}}>
			{count
				? (
					<div style={{position: "relative", left: "135px"}}>
						<Counter count={count} size={"default"}></Counter>
					</div>
				)
				: undefined
			}
			<img className={"pl-4 pr-4"}
				 src={item.image}
				 alt="Избображение"
				 width={"240px"}
				 height={"120px"}
			/>
			<div className={"pt-1 pb-1"} style={{display: "flex", flexDirection: "row"}}>
				<p className={"text text_type_digits-default"}>{item.price}</p>
				<CurrencyIcon type={"primary"}></CurrencyIcon>
			</div>
			<p className={"text text_type_main-small"} style={{textAlign: "center"}}>{item.name}</p>
		</li>
	)
}