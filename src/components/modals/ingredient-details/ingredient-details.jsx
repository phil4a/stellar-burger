import styles from './ingredient-details.module.css';
const IngredientDetails = (props) => {
	console.log(props);
	return (
		<div className={styles.body}>
			<h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
			<img src={props.ingredient.image_large} className="mb-4" alt={props.ingredient.name} />
			<h3 className="text text_type_main-medium mb-8">{props.ingredient.name}</h3>
			<div className={`${styles.info} mb-5 text text_type_main-default text_color_inactive`}>
				<div>
					<p>Калории, ккал</p>
					<p className="text text_type_digits-default">{props.ingredient.calories}</p>
				</div>
				<div>
					<p>Белки, г</p>
					<p className="text text_type_digits-default">{props.ingredient.proteins}</p>
				</div>
				<div>
					<p>Жиры, г</p>
					<p className="text text_type_digits-default">{props.ingredient.fat}</p>
				</div>
				<div>
					<p>Углеводы, г</p>
					<p className="text text_type_digits-default">{props.ingredient.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
