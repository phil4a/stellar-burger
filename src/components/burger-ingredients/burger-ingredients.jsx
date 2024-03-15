import IngredientList from './ingredient-list/ingredient-list';
import IngredientTabs from './ingredient-tabs/ingredient-tabs';

import propTypes from 'prop-types';
const BurgerIngredients = ({ ingredients }) => {
	return (
		<section
			style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '600px' }}
			className="pt-10 mr-10">
			<h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
			<IngredientTabs />
			<IngredientList ingredients={ingredients} />
		</section>
	);
};

const burgerIngredientsPropTypes = propTypes.shape({
	_id: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	image: propTypes.string.isRequired,
	type: propTypes.string.isRequired,
	price: propTypes.number.isRequired,
	proteins: propTypes.number,
	fat: propTypes.number,
	carbohydrates: propTypes.number,
	calories: propTypes.number,
	image_mobile: propTypes.string,
	image_large: propTypes.string,
	__v: propTypes.number,
});

BurgerIngredients.propTypes = {
	ingredients: propTypes.arrayOf(burgerIngredientsPropTypes),
};

export default BurgerIngredients;
