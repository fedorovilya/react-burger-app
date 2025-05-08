import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientDetails} from '@components/burger-ingredients/ingredientDetails';
import {
	detachSelected,
	setSelected,
} from '@services/slice/selectedIngredientSlice';
import {useDrag} from 'react-dnd';
import {DRAG_BUN, DRAG_INGREDIENT, TYPE_BUN} from '../../const/const';
import {Modal} from "@components/modal/modal";
import {useModal} from "../../hooks/useModal";
import {useAppDispatch, useAppSelector} from "@services/store";
import {useEffect} from "react";
import {Ingredient} from "../../types/ingredientsResponse";

interface Props {
	item: Ingredient,
	count?: number,
	index: string
}

export const IngredientCard = ({item, count, index}: Props) => {
	const searchParams = new URLSearchParams(location.search);
	const reopenModal = searchParams.get('reopenModal') === "true";
	const reopenId = searchParams.get('reopenId') === item._id;

	const dispatch = useAppDispatch();
	const {isModalOpen, openModal, closeModal} = useModal();
	const {selectedIngredient} = useAppSelector((state) => state.selectedIngredient);

	const handleOnClick = (item: Ingredient) => {
		dispatch(setSelected(item));
		window.history.pushState({}, '', `/ingredients/${item._id}?modal=true`);
		openModal();
	};
	const handleOnClose = () => {
		closeModal();
		dispatch(detachSelected());
		window.history.pushState({}, '', '/');
	};

	const [{isDragging}, drag] = useDrag(() => ({
		type: DRAG_INGREDIENT,
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end(item, monitor) {
			if (monitor.didDrop()) {
			}
		},
	}));

	const [{isDraggingBun}, dragBun] = useDrag(() => ({
		type: DRAG_BUN,
		item: item,
		collect: (monitor) => ({
			isDraggingBun: monitor.isDragging(),
		}),
		end(item, monitor) {
			if (monitor.didDrop()) {
			}
		},
	}));

	useEffect(() => {
		if (reopenModal && reopenId) {
			const timeoutId = setTimeout(() => {
				handleOnClick(item);
			}, 500);
			return () => clearTimeout(timeoutId);
		}
	}, [searchParams, reopenModal, reopenId, handleOnClick, item])

	return (
		<>
			{selectedIngredient && isModalOpen && (
				<Modal title={'Детали ингредиента'} onClose={handleOnClose}>
					<IngredientDetails data={selectedIngredient}/>
				</Modal>
			)}
			<li
				id={`ingredient-${index}`}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '208px',
					width: '272px',
					justifyContent: 'flex-start',
					alignItems: 'center',
					border:
						isDragging || isDraggingBun ? '1px solid #3E3E3EFF' : 'transparent',
					boxShadow:
						isDragging || isDraggingBun ? '0 0 1px 1px #3E3E3E91' : 'none',
					borderRadius: '10px',
				}}>
				{count ? (
					<div style={{position: 'relative', left: '135px'}}>
						<Counter count={count} size={'default'}></Counter>
					</div>
				) : undefined}
				<img
					ref={item.type === TYPE_BUN ? dragBun : drag}
					onClick={() => handleOnClick(item)}
					className={'pl-4 pr-4'}
					src={item.image}
					alt='Избображение'
					width={'240px'}
					height={'120px'}
					style={{cursor: 'pointer'}}
				/>
				<div
					className={'pt-1 pb-1'}
					style={{display: 'flex', flexDirection: 'row'}}>
					<p className={'text text_type_digits-default'}>{item.price}</p>
					<CurrencyIcon type={'primary'}></CurrencyIcon>
				</div>
				<p
					className={'text text_type_main-small'}
					style={{textAlign: 'center'}}>
					{item.name}
				</p>
			</li>
		</>
	);
}
