import propTypes from 'prop-types';

export const ingredientType = propTypes.shape({
	_id: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	image: propTypes.string.isRequired,
	image_mobile: propTypes.string.isRequired,
	type: propTypes.string.isRequired,
	price: propTypes.number.isRequired,
	proteins: propTypes.number,
	fat: propTypes.number,
	carbohydrates: propTypes.number,
	calories: propTypes.number,
	image_large: propTypes.string,
	__v: propTypes.number,
});
