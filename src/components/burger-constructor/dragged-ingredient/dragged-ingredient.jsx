import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { decreaseIngredientsCounter } from '../../../services/ingredients-slice';

import { deleteIngredient, moveIngredients } from '../../../services/constructor-slice';
import styles from '../burger-constructor.module.css';

import propTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const DraggedIngredient = ({ ingredient, id, index }) => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	const [, drop] = useDrop({
		accept: 'card',
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch(moveIngredients({ dragIndex, hoverIndex }));

			item.index = hoverIndex;
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

	const handleDelete = () => {
		dispatch(deleteIngredient(ingredient.nanoid));
		dispatch(decreaseIngredientsCounter(ingredient));
	};

	return (
		<div ref={ref} className={styles.ingredient} style={{ opacity }}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image_mobile}
				handleClose={() => handleDelete()}
			/>
		</div>
	);
};

DraggedIngredient.propTypes = {
	ingredient: ingredientType.isRequired,
	id: propTypes.string.isRequired,
	index: propTypes.number.isRequired,
};

export default DraggedIngredient;
