import styles from './ingredientDetails.module.css';
import { cardItemProps } from '@utils/props';

export const IngredientDetails = ({ data }) => {
	return (
		<div className={styles.flex}>
			<img
				src={data.image}
				alt='Избображение'
				width={'480px'}
				height={'240px'}
			/>
			<p className='text text_type_main-medium pt-4'>{data.name}</p>
			<div className={`${styles.flex_info} pt-8`}>
				<div className={styles.flex_text}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{data.calories}
					</p>
				</div>
				<div className={styles.flex_text}>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{data.proteins}
					</p>
				</div>
				<div className={styles.flex_text}>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{data.fat}
					</p>
				</div>
				<div className={styles.flex_text}>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{data.carbohydrates}
					</p>
				</div>
			</div>
		</div>

	)
};

IngredientDetails.propTypes = {
	data: cardItemProps,
};
