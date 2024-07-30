import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { IWebsocketOrder } from '../../../utils/websockets-types';
import { RootState, useAppSelector } from '../../../services/store';
import {
	calculateTotalPrice,
	getIngredientsByIds,
	useAllIngredients,
} from '../../../utils/helpers';

import styles from './order-info.module.css';

interface IOrderInfoProps {
	order: IWebsocketOrder;
}

const OrderInfo = ({ order }: IOrderInfoProps) => {
	const location = useLocation();

	const { ingredients, _id, status, number, createdAt, updatedAt, name } = order;

	const allIngredients = useAllIngredients();
	const orderIngredients = getIngredientsByIds(allIngredients, order.ingredients);
	const totalPrice = calculateTotalPrice(orderIngredients);

	return (
		<li className={styles.item}>
			<Link to={`/feed/${number}`} className={styles.link} state={{ background: location }}>
				<div className={styles.info}>
					<span className="text text_type_digits-default">#{number}</span>
					<span className="text text_type_main-default ml-2">
						<FormattedDate date={new Date(createdAt)} />
					</span>
				</div>
				<h2 className="text text_type_main-medium">{name}</h2>
				<div className={styles.list}>
					<ul className={styles.orderItems}>
						{orderIngredients.length > 6 && (
							<li className={styles.orderItem}>
								<span className={`${styles.remainingItems} text text_type_main-default`}>
									+{orderIngredients.length - 6}
								</span>
							</li>
						)}
						{orderIngredients.slice(0, 6).map((ingredient, index) => {
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
