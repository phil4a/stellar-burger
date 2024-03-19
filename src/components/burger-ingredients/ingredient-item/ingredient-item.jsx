import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ show, ...props }) => {
	return (
		<li onClick={() => show('ingredientDetails', props)} className={styles.item} {...props}>
			<img className="pl-4 pr-4" src={props.image} alt={props.name} />
			<div className={`${styles.price} text text_type_digits-default pt-1 pb-1`}>
				<span className="pr-2">{props.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text text_type_main-default pl-2 pr-2">{props.name}</p>
		</li>
	);
};

export default IngredientItem;
