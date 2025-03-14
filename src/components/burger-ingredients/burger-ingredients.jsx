import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {IngredientsData} from "@utils/ingredientsData";
import {IngredientCard} from "@components/burger-ingredients/ingredient-card";

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState('bread')
	const breadItems = IngredientsData.filter(item => item.type === "bun");
	const sauceItems = IngredientsData.filter(item => item.type === "sauce");
	const mainItems = IngredientsData.filter(item => item.type === "main");

	return (
		<div className={"pt-10"} style={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			width: "600px",
			height: "100%"
		}}>
			<p className={"text text_type_main-large pt-10"}>Соберите бургер</p>
			<div className={"pt-5"} style={{display: 'flex'}}>
				<Tab value="bread" active={current === 'bread'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="main" active={current === 'main'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<ul style={{maxHeight: "900px", overflowY: "auto", padding: "0px", margin: "0px"}}>
				<div id={"bun_block"} className={"pt-10"}>
					<p className={"text text_type_main-medium pt-10"}>Булки</p>
					<div className={"pt-6 pl-4 pr-4"} style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						columnGap: "24px",
						rowGap: "32px"
					}}>
						{breadItems
							? breadItems.map((item, index) => (
									<IngredientCard key={index} item={item} index={index} count={10}></IngredientCard>
								)
							)
							: undefined
						}
					</div>
				</div>

				<div id={"sauce_block"} className={"pt-10"}>
					<p className={"text text_type_main-medium pt-10"}>Соусы</p>
					<div className={"pt-6 pl-4"} style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						columnGap: "24px",
						rowGap: "32px"
					}}>
						{sauceItems
							? sauceItems.map((item, index) => (
									<IngredientCard key={index} item={item} index={index}></IngredientCard>
								)
							)
							: undefined
						}
					</div>
				</div>

				<div id={"main_block"} className={"pt-10"}>
					<p className={"text text_type_main-medium pt-10"}>Начинки</p>
					<div className={"pt-6 pl-4"} style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						columnGap: "24px",
						rowGap: "32px"
					}}>
						{mainItems
							? mainItems.map((item, index) => (
									<IngredientCard key={index} item={item} index={index}></IngredientCard>
								)
							)
							: undefined
						}
					</div>
				</div>
			</ul>
		</div>
	)
}