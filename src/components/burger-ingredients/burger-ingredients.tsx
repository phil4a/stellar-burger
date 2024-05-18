import IngredientList from './ingredient-list/ingredient-list';
import styles from './burger-ingredients.module.css';

const BurgerIngredients: React.FC = (): JSX.Element => {
	return (
		<section className={`${styles.section} pt-10 mr-10`}>
			<h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
			<IngredientList />
		</section>
	);
};

export default BurgerIngredients;
