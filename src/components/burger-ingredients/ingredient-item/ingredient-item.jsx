import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

import propTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const IngredientItem = ({ show, ingredient }) => {
	return (
		<li
			onClick={() => show('ingredientDetails', ingredient)}
			className={styles.item}
			{...ingredient}>
			<img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.price} text text_type_digits-default pt-1 pb-1`}>
				<span className="pr-2">{ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text text_type_main-default pl-2 pr-2">{ingredient.name}</p>
		</li>
	);
};
IngredientItem.propTypes = {
	ingredient: ingredientType.isRequired,
	show: propTypes.func.isRequired,
};

export default IngredientItem;
