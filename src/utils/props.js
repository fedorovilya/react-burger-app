import PropTypes from "prop-types";

export const ingredientProps = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
}).isRequired;

export const cardItemProps = PropTypes.shape({
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired
}).isRequired;

export const cardItemsProps = PropTypes.arrayOf(
	cardItemProps
);

export const ingredientsProps = PropTypes.arrayOf(
	ingredientProps
);


