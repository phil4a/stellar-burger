import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, moveIngredients } from '../../services/constructor-slice';
import styles from './burger-constructor.module.css';

const DraggedIngredient = ({ ingredient, id, index }) => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	const [, drop] = useDrop({
		accept: 'card',
		hover(item, monitor) {
			const dragIndex = item.index;
			const hoverIndex = index;
			dispatch(moveIngredients({ dragIndex, hoverIndex }));
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<div ref={ref} className={styles.ingredient} style={{ opacity }}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image_mobile}
				handleClose={() => dispatch(deleteIngredient(ingredient.nanoid))}
			/>
		</div>
	);
};

export default DraggedIngredient;
