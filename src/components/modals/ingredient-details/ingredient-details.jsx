import styles from './ingredient-details.module.css';
import propTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const IngredientDetails = (props) => {
	console.log(props);
	return (
		<div className={styles.body}>
			<h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
			<img src={props.image_large} className="mb-4" alt={props.name} />
			<h3 className="text text_type_main-medium mb-8">{props.name}</h3>
			<ul className={`${styles.info} mb-5 text text_type_main-default text_color_inactive`}>
				<li>
					<p>Калории, ккал</p>
					<p className="text text_type_digits-default">{props.calories}</p>
				</li>
				<li>
					<p>Белки, г</p>
					<p className="text text_type_digits-default">{props.proteins}</p>
				</li>
				<li>
					<p>Жиры, г</p>
					<p className="text text_type_digits-default">{props.fat}</p>
				</li>
				<li>
					<p>Углеводы, г</p>
					<p className="text text_type_digits-default">{props.carbohydrates}</p>
				</li>
			</ul>
		</div>
	);
};

IngredientDetails.propTypes = {
	props: propTypes.object.isRequired,
};

export default IngredientDetails;
