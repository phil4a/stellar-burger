import IngredientList from './ingredient-list/ingredient-list';
import IngredientTabs from './ingredient-tabs/ingredient-tabs';
import styles from './burger-ingredients.module.css';

import propTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
const BurgerIngredients = ({ ingredients, show }) => {
	return (
		<section className={`${styles.section} pt-10 mr-10`}>
			<h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
			<IngredientTabs />
			<IngredientList ingredients={ingredients} show={show} />
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: propTypes.arrayOf(ingredientType).isRequired,
	show: propTypes.func.isRequired,
};

export default BurgerIngredients;
