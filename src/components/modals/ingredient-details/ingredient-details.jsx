import styles from './ingredient-details.module.css';
const IngredientDetails = ({ ...props }) => {
	console.log(props);
	return (
		<div className={styles.body}>
			<h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
		</div>
	);
};

export default IngredientDetails;
