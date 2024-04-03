import { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { setIngredients, setBun } from '../../services/constructor-slice';

import { sendOrder } from '../../services/order-slice';

import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderTotalPrice from './order-total-price/order-total-price';

import styles from './burger-constructor.module.css';

import propTypes from 'prop-types';

function totalReducer(state, action) {
	switch (action.type) {
		case 'calculate':
			const total = action.payload.reduce((acc, item) => acc + item.price, 0) + action.bunPrice * 2;
			return { total };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const BurgerConstructor = ({ show }) => {
	const dispatch = useDispatch();
	// const { ingredients } = useSelector((store) => store.ingredients);

	// const buns = ingredients.filter((item) => item.type === 'bun');
	// const otherIngredients = ingredients.filter((item) => item.type !== 'bun');
	// const bun = buns[0];

	// const [{ total }, dispatch] = useReducer(totalReducer, { total: 0 });

	const ingredients = useSelector((store) => store.burgerConstructor.ingredients);
	const bun = useSelector((store) => store.burgerConstructor.bun);

	const handleOrderClick = () => {
		// const ingredientIds = [bun._id, ...otherIngredients].map(
		// 	(ingredient) => ingredient._id,
		// 	bun._id,
		// );
		// dispatch(sendOrder(ingredientIds));
		// show('orderDetails');
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

	// useEffect(() => {
	// 	dispatch({ type: 'calculate', payload: otherIngredients, bunPrice: bun.price });
	// }, [ingredients]);

	const borderColor = canDrop && itemType === 'bun' ? '#4C4CFF' : 'transparent';
	const borderColorIngredients = canDrop && itemType !== 'bun' ? '#4C4CFF' : 'transparent';
	return (
		<section className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div ref={dropRef}>
				<div className={styles.bun} style={{ borderColor: borderColor }}>
					{bun ? (
						<ConstructorElement
							type="top"
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
						/>
					) : (
						<div className={styles.mainPlaceholder}>
							<p className="text text_type_main-default">Перенесите сюда булку</p>
						</div>
					)}
				</div>
				{/* <ConstructorElement
				type="top"
				isLocked={true}
				text={`${bun.name} (верх)`}
				price={bun.price}
				thumbnail={bun.image_mobile}
			/> */}
				<div className={styles.ingredients} style={{ borderColor: borderColorIngredients }}>
					{ingredients.length ? (
						ingredients.map((ingredient) => (
							<ConstructorElement
								key={ingredient._id}
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image_mobile}
							/>
						))
					) : (
						<div className={styles.mainPlaceholder}>
							<p className="text text_type_main-default">Перенесите сюда ингредиенты</p>
						</div>
					)}
				</div>
				{/* <div className={styles.ingredients}>
				{otherIngredients.map((ingredient) => (
					<ConstructorElement
						key={ingredient._id}
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image_mobile}
					/>
				))}
			</div> */}

				<div className={styles.bun} style={{ borderColor: borderColor }}>
					{bun ? (
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
						/>
					) : (
						<div className={styles.bottomBunPlaceholder}>
							<p className="text text_type_main-default">Перенесите сюда булку</p>
						</div>
					)}
				</div>
			</div>

			{/* <ConstructorElement
				type="bottom"
				isLocked={true}
				text={`${bun.name} (низ)`}
				price={bun.price}
				thumbnail={bun.image_mobile}
			/> */}

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
