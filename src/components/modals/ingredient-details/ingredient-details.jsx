import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../../services/current-ingredient-slice';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const ingredient = useSelector((state) => state.currentIngredient.ingredient);
	const ingredients = useSelector((state) => state.ingredients.ingredients);

	useEffect(() => {
		const ingredientData = ingredients.find((ing) => ing._id === id);
		if (ingredientData) {
			dispatch(setCurrentIngredient(ingredientData));
		}
	}, [id, dispatch, ingredients]);

	return (
		ingredient && (
			<div className={styles.body}>
				<h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
				<img src={ingredient.image_large} className="mb-4" alt={ingredient.name} />
				<h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>
				<ul className={`${styles.info} mb-5 text text_type_main-default text_color_inactive`}>
					<li>
						<p>Калории, ккал</p>
						<p className="text text_type_digits-default">{ingredient.calories}</p>
					</li>
					<li>
						<p>Белки, г</p>
						<p className="text text_type_digits-default">{ingredient.proteins}</p>
					</li>
					<li>
						<p>Жиры, г</p>
						<p className="text text_type_digits-default">{ingredient.fat}</p>
					</li>
					<li>
						<p>Углеводы, г</p>
						<p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
					</li>
				</ul>
			</div>
		)
	);
};

export default IngredientDetails;
