import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@services/store';
import {IngredientDetails} from '@components/burger-ingredients/ingredientDetails';
import {useNavigate} from 'react-router-dom';
import {Ingredient} from "../../types/ingredientsResponse";
import React, {useEffect} from "react";
import {setSelected} from "@services/slice/selectedIngredientSlice";
import {AppHeader} from "@components/app-header/appHeader";

export const IngredientInfo = () => {
	const searchParams = new URLSearchParams(location.search);
	const isModal = searchParams.get('modal') === "true";
	const {id} = useParams<{ id: string }>();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {selectedIngredient} = useAppSelector((state) => state.selectedIngredient);
	const ingredient = useAppSelector((state) =>
		state.ingredients.ingredients?.find((item: Ingredient) => item._id === id)
	);

	useEffect(() => {
		if (!selectedIngredient) {
			dispatch(setSelected(ingredient));
		}
	}, [ingredient]);

	useEffect(() => {
		if (isModal) {
			navigate(`/?reopenModal=true&reopenId=${id}`, {replace: true})
		}
	}, [id, isModal]);

	if (!ingredient) {
		return <div>Ингредиент не найден</div>;
	}

	return (
		<div>
			<AppHeader/>
			<div className={"pt-20"}>
				<IngredientDetails data={ingredient}/>
			</div>
		</div>
	)
}
