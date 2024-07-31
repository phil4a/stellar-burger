import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../services/store';
import { RootState } from '../../../services/store';

import { fetchOrderByNumber } from '../../../services/order-slice';

import {
	calculateTotalPrice,
	getIngredientsByIds,
	useAllIngredients,
} from '../../../utils/helpers';

import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Preloader from '../../preloader/preloader';

const FeedDetails: React.FC = (): JSX.Element | null => {
	const dispatch = useAppDispatch();
	const { number } = useParams<{ number: string }>();

	const order = useAppSelector((state: RootState) => {
		let order = state.orders.orders.find((order) => order.number === +number!);

		if (order) {
			return order;
		}
		order = state.profileOrders.profileOrders.find((order) => order.number === +number!);
		if (order) {
			return order;
		}
		return (order = state.currentOrder.recievedOrderByNumber);
	});

	useEffect(() => {
		if (!order) {
			dispatch(fetchOrderByNumber(number!));
		}
	}, [dispatch, number]);

	const { name, ingredients, status, createdAt } = order || {};

	const allIngredients = useAllIngredients();
	const orderIngredients = getIngredientsByIds(allIngredients, ingredients ?? []);

	// Группируем ингредиенты и подсчитываем их количество
	const ingredientCountMap: Record<string, { ingredient: any; count: number }> = {};

	orderIngredients.forEach((ingredient) => {
		if (ingredient) {
			const existing = ingredientCountMap[ingredient._id];
			if (existing) {
				existing.count += 1;
			} else {
				ingredientCountMap[ingredient._id] = { ingredient, count: 1 };
			}
		}
	});

	const uniqueIngredients = Object.values(ingredientCountMap);

	const totalPrice = calculateTotalPrice(orderIngredients);

	if (!order) {
		return <Preloader />;
	}

	return (
		<div className={styles.body}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>#{number}</p>
			<h1 className="text text_type_main-medium mb-3">{name}</h1>
			<p className={`${styles.status} text text_type_main-default mb-15`}>
				{status === 'done' ? 'Готов' : status === 'pending' ? 'В работе' : status}
			</p>
			<h2 className="text text_type_main-medium mb-6">Состав:</h2>

			<ul className={`${styles.list} pr-6 mb-10`}>
				{uniqueIngredients.map(({ ingredient, count }) => (
					<li className={styles.item} key={ingredient._id}>
						<div className={styles.ingredientImg}>
							<img src={ingredient.image_mobile} alt={ingredient.name} />
						</div>
						<h3 className={`${styles.ingredientName} text text_type_main-default`}>
							{ingredient.name}
						</h3>
						<div className={styles.ingredientPrice}>
							<span className={`${styles.quantity} text text_type_digits-default`}>{count}</span>
							<span className="text text_type_main-default">x</span>
							<span className={`${styles.price} text text_type_digits-default`}>
								{ingredient.price}
							</span>
							<CurrencyIcon type="primary" />
						</div>
					</li>
				))}
			</ul>
			<div className={`${styles.summary} text text_type_main-default}`}>
				<span className="text text_type_main-default text_color_inactive">
					{<FormattedDate date={new Date(createdAt as string)} />}
				</span>
				<div className={`${styles.total} text text_type_digits-default`}>
					<span className="text text_type_digits-default">{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default FeedDetails;
