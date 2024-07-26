import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-info.module.css';

import { IWebsocketOrder } from '../../../utils/websockets-types';
import { RootState, useAppSelector } from '../../../services/store';

interface IOrderInfoProps {
	order: IWebsocketOrder;
}

const OrderInfo = ({ order }: IOrderInfoProps) => {
	const location = useLocation();

	const { ingredients, _id, status, number, createdAt, updatedAt, name } = order;
	const allIngredients = useAppSelector((state: RootState) => state.ingredients.ingredients);

	const orderIngredients = ingredients.map((id) =>
		allIngredients.find((ingredient) => ingredient._id === id),
	);

	const totalPrice = orderIngredients.reduce(
		(sum, ingredient) => sum + (ingredient ? ingredient.price : 0),
		0,
	);

	return (
		<li className={styles.item}>
			<Link to={`/feed/${_id}`} className={styles.link} state={{ background: location }}>
				<div className={styles.info}>
					<span className="text text_type_digits-default">#{number}</span>
					<span className="text text_type_main-default ml-2">
						{new Intl.DateTimeFormat('ru', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						}).format(new Date(createdAt))}
					</span>
				</div>
				<h2 className="text text_type_main-medium">{name}</h2>
				<div className={styles.list}>
					<ul className={styles.orderItems}>
						{orderIngredients.map((ingredient, index) => {
							if (!ingredient) return null;

							const uniqueKey = `${ingredient._id}-${index}`;
							return (
								<li className={styles.orderItem} key={uniqueKey}>
									<img
										className={styles.orderItemImg}
										src={ingredient.image}
										alt={ingredient.name}
									/>
								</li>
							);
						})}
					</ul>
					<div className={styles.price}>
						<span className="text text_type_digits-default">{totalPrice}</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</Link>
		</li>
	);
};

export default OrderInfo;
