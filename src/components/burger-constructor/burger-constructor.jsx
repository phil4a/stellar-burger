import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { setIngredients, setBun, deleteIngredient } from '../../services/constructor-slice';

import { sendOrder } from '../../services/order-slice';

import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderTotalPrice from './order-total-price/order-total-price';

import styles from './burger-constructor.module.css';

import propTypes from 'prop-types';

const BurgerConstructor = ({ show }) => {
	const dispatch = useDispatch();

	const ingredients = useSelector((store) => store.burgerConstructor.ingredients);
	const bun = useSelector((store) => store.burgerConstructor.bun);

	const handleOrderClick = () => {
		const ingredientIds = [bun, ingredients].map((ingredient) => ingredient._id, bun._id);
		dispatch(sendOrder(ingredientIds));
		show('orderDetails');
	};

	const [{ canDrop, itemType }, dropRef] = useDrop({
		accept: ['ingredient', 'bun'],
		drop(item) {
			if (item.type === 'bun') {
				dispatch(setBun(item));
			} else {
				dispatch(setIngredients(item));
			}
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			itemType: monitor.getItemType(),
		}),
	});

	const borderColor = canDrop && itemType === 'bun' ? '#4C4CFF' : 'transparent';
	const borderColorIngredients = canDrop && itemType !== 'bun' ? '#4C4CFF' : 'transparent';
	return (
		<section ref={dropRef} className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div
				className={`${styles.bun} ${styles.topBunPlaceholder}`}
				style={{ borderColor: borderColor }}>
				{bun ? (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.topBunPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда булку</p>
					</div>
				)}
			</div>

			<div className={styles.ingredients} style={{ borderColor: borderColorIngredients }}>
				{ingredients.length ? (
					ingredients.map((ingredient) => (
						<ConstructorElement
							key={ingredient.uuid}
							text={ingredient.name}
							price={ingredient.price}
							thumbnail={ingredient.image_mobile}
							handleClose={() => dispatch(deleteIngredient(ingredient.uuid))}
						/>
					))
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.mainPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда ингредиенты</p>
					</div>
				)}
			</div>

			<div
				className={`${styles.bun} ${styles.bottomBunPlaceholder}`}
				style={{ borderColor: borderColor }}>
				{bun ? (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.bottomBunPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда булку</p>
					</div>
				)}
			</div>

			<div className={`${styles.actions} mt-4`}>
				<OrderTotalPrice />
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={handleOrderClick}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	show: propTypes.func.isRequired,
};

export default BurgerConstructor;
