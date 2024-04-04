import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { UseSelector } from 'react-redux';

import styles from './ingredient-item.module.css';
import propTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const IngredientItem = ({ show, ingredient }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.3 : 1;
	return (
		<li
			ref={dragRef}
			onClick={() => show('ingredientDetails', ingredient)}
			className={styles.item}
			style={{ opacity }}
			{...ingredient}>
			<img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.price} text text_type_digits-default pt-1 pb-1`}>
				<span className="pr-2">{ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text text_type_main-default pl-2 pr-2">{ingredient.name}</p>
			{ingredient.count > 0 && <Counter count={ingredient.count} size="default" />}
		</li>
	);
};
IngredientItem.propTypes = {
	ingredient: ingredientType.isRequired,
	show: propTypes.func.isRequired,
};

export default IngredientItem;
