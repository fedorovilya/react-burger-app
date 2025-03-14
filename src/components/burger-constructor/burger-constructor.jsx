import {useState} from "react";
import {IngredientsData} from "@utils/ingredientsData";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientCard} from "@components/burger-ingredients/ingredient-card";

export const BurgerConstructor = () => {
	const [current, setCurrent] = useState('bread')
	const breadItems = IngredientsData.filter(item => item.type === "bun");
	const sauceItems = IngredientsData.filter(item => item.type === "sauce");
	const mainItems = IngredientsData.filter(item => item.type === "main");

	return (
		<div className={"pt-10"} style={{
			left: "380px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			width: "600px"
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
		</div>
	)
}