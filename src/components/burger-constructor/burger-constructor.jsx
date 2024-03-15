import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderTotalPrice from './order-total-price/order-total-price';

import propTypes from 'prop-types';

const BurgerConstructor = ({ ingredients }) => {
	const buns = ingredients.filter((item) => item.type === 'bun');
	const otherIngredients = ingredients.filter((item) => item.type !== 'bun');

	const bun = buns[0];

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '100%',
				height: '100%',
			}}
			className="pt-25 pl-4 pr-4">
			<ConstructorElement
				type="top"
				isLocked={true}
				text={`${bun.name} (верх)`}
				price={bun.price}
				thumbnail={bun.image_mobile}
			/>
			<div
				style={{
					overflowY: 'auto',
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}>
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

			<div
				style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
				className="mt-4">
				<OrderTotalPrice />
				<Button htmlType="button" type="primary" size="large" extraClass="ml-10">
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

const burgerConstructorPropTypes = propTypes.shape({
	_id: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	image: propTypes.string,
	image_mobile: propTypes.string.isRequired,
	type: propTypes.string.isRequired,
	price: propTypes.number.isRequired,
	proteins: propTypes.number,
	fat: propTypes.number,
	carbohydrates: propTypes.number,
	calories: propTypes.number,
	image_large: propTypes.string,
	__v: propTypes.number,
});

BurgerConstructor.propTypes = {
	ingredients: propTypes.arrayOf(burgerConstructorPropTypes),
};

export default BurgerConstructor;
