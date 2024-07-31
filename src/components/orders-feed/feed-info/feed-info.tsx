import React from 'react';
import { IWebsocketOrder } from '../../../utils/websockets-types';
import styles from './feed-info.module.css';

interface FeedInfoProps {
	orders: IWebsocketOrder[];
	total: number;
	totalToday: number;
}

const FeedInfo = (props: FeedInfoProps) => {
	const { total, totalToday, orders } = props;

	const extractOrderNumbers = (filter: 'done' | 'pending') =>
		orders
			.filter((order) => order.status === filter)
			.map((order) => order.number.toString())
			.slice(0, 20);

	const readyOrdersNum = extractOrderNumbers('done');
	const inProgressOrdersNum = extractOrderNumbers('pending');

	return (
		<section className={`${styles.section} pt-25`}>
			<div className={`${styles.orders}`}>
				<div className={styles.ordersCol}>
					<h2 className="text text_type_main-medium mb-6">Готовы:</h2>
					<ul className={styles.list}>
						{readyOrdersNum.map((num) => (
							<li className={styles.item} key={num}>
								<p className="text text_type_digits-default">{num}</p>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.ordersCol}>
					<h2 className="text text_type_main-medium mb-6">В работе:</h2>
					<ul className={styles.list}>
						{inProgressOrdersNum.map((num) => (
							<li key={num}>
								<p className="text text_type_digits-default">{num}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles.total}>
				<h2 className="text text_type_main-medium">Выполнено за все время:</h2>
				<p className="text text_type_digits-large">{total}</p>
			</div>
			<div className={styles.totalToday}>
				<h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
				<p className="text text_type_digits-large">{totalToday}</p>
			</div>
		</section>
	);
};

export default FeedInfo;
