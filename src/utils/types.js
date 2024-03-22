import propTypes from 'prop-types';

export const ingredientType = propTypes.shape({
	_id: propTypes.string,
	name: propTypes.string,
	image: propTypes.string,
	image_mobile: propTypes.string,
	type: propTypes.string,
	price: propTypes.number,
	proteins: propTypes.number,
	fat: propTypes.number,
	carbohydrates: propTypes.number,
	calories: propTypes.number,
	image_large: propTypes.string,
	__v: propTypes.number,
});
