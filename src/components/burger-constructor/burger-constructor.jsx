import { useContext, useReducer, useEffect } from 'react';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderTotalPrice from './order-total-price/order-total-price';

import { IngredientsContext } from '../../services/ingredients-context';

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
	const { ingredients } = useContext(IngredientsContext);
	const buns = ingredients.filter((item) => item.type === 'bun');
	const otherIngredients = ingredients.filter((item) => item.type !== 'bun');
	const bun = buns[0];

	const [{ total }, dispatch] = useReducer(totalReducer, { total: 0 });

	useEffect(() => {
		dispatch({ type: 'calculate', payload: otherIngredients, bunPrice: bun.price });
	}, [ingredients]);

	return (
		<section className={`${styles.section} pt-25 pl-4 pr-4`}>
			<ConstructorElement
				type="top"
				isLocked={true}
				text={`${bun.name} (верх)`}
				price={bun.price}
				thumbnail={bun.image_mobile}
			/>
			<div className={styles.ingredients}>
				{otherIngredients.map((ingredient) => (
					<ConstructorElement
						key={ingredient._id}
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image_mobile}
					/>
				))}
			</div>

			<ConstructorElement
				type="bottom"
				isLocked={true}
				text={`${bun.name} (низ)`}
				price={bun.price}
				thumbnail={bun.image_mobile}
			/>

			<div className={`${styles.actions} mt-4`}>
				<OrderTotalPrice total={total} />
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={() => {
						show('orderDetails');
					}}>
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
