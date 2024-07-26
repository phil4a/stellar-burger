import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../services/store';
import { RootState } from '../../../services/store';
import { getOrderById } from '../../../services/websockets/order-feed/slice';

import {
	calculateTotalPrice,
	getIngredientsByIds,
	useAllIngredients,
} from '../../../utils/helpers';

import styles from './feed-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedDetails: React.FC = (): JSX.Element | null => {
	const { id } = useParams<{ id: string }>();

	const order = useAppSelector((state: RootState) => getOrderById(state, id));
	const { name, ingredients, number, status, _id, createdAt, updatedAt } = order || {};

	const allIngredients = useAllIngredients();
	const orderIngredients = getIngredientsByIds(allIngredients, ingredients ?? []);
	const totalPrice = calculateTotalPrice(orderIngredients);

	return (
		<div className={styles.body}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>#{number}</p>
			<h1 className="text text_type_main-medium mb-3">{name}</h1>
			<p className={`${styles.status} text text_type_main-default mb-15`}>
				{status === 'done' ? 'Готов' : status === 'inprogress' ? 'В работе' : status}
			</p>
			<h2 className="text text_type_main-medium mb-6">Состав:</h2>

			<ul className={`${styles.list} pr-6 mb-10`}>
				{orderIngredients.map((ingredient, index) => {
					if (!ingredient) return null;

					const uniqueKey = `${ingredient._id}-${index}`;
					return (
						<li className={styles.item} key={uniqueKey}>
							<div className={styles.ingredientImg}>
								<img src={ingredient?.image_mobile} alt={ingredient?.name} />
							</div>
							<h3 className={`${styles.ingredientName} text text_type_main-default`}>
								{ingredient?.name}
							</h3>
							<div className={styles.ingredientPrice}>
								<span className={`${styles.quantity} text text_type_digits-default`}>1</span>
								<span className="text text_type_main-default">x</span>
								<span className={`${styles.price} text text_type_digits-default`}>
									{ingredient?.price}
								</span>
								<CurrencyIcon type="primary" />
							</div>
						</li>
					);
				})}
			</ul>
			<div className={`${styles.summary} text text_type_main-default}`}>
				<span className="text text_type_main-default text_color_inactive">
					{new Intl.DateTimeFormat('ru', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					}).format(new Date(createdAt as string))}
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
