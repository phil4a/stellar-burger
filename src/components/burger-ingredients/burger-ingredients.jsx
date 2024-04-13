import IngredientList from './ingredient-list/ingredient-list';
import styles from './burger-ingredients.module.css';

import propTypes from 'prop-types';

const BurgerIngredients = () =>
	// { show }
	{
		return (
			<section className={`${styles.section} pt-10 mr-10`}>
				<h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
				<IngredientList
				//  show={show}
				/>
			</section>
		);
	};
BurgerIngredients.propTypes = {
	show: propTypes.func.isRequired,
};

export default BurgerIngredients;
