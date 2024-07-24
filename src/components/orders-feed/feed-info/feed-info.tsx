import React from 'react';
import styles from './feed-info.module.css';

type Props = {};

const readyOrdersNumbers = [
	'034533',
	'034532',
	'034530',
	'034527',
	'034525',
	'034524',
	'034523',
	'034522',
	'034521',
	'034520',
	'034519',
	'034518',
	'034517',
];
const inProgressOrdersNumbers = [
	'034533',
	'034532',
	'034530',
	'034533',
	'034532',
	'034530',
	'034533',
	'034532',
	'034530',
	'034533',
	'034532',
	'034530',
	'034533',
	'034532',
	'034530',
];

const FeedInfo = (props: Props) => {
	return (
		<section className={`${styles.section} pt-25`}>
			<div className={`${styles.orders}`}>
				<div className={styles.ordersCol}>
					<h2 className="text text_type_main-medium mb-6">Готовы:</h2>
					<ul className={styles.list}>
						{readyOrdersNumbers.map((num) => (
							<li className={styles.item} key={num}>
								<p className="text text_type_digits-default">{num}</p>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.ordersCol}>
					<h2 className="text text_type_main-medium mb-6">В работе:</h2>
					<ul className={styles.list}>
						{inProgressOrdersNumbers.map((num) => (
							<li key={num}>
								<p className="text text_type_digits-default">{num}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles.total}>
				<h2 className="text text_type_main-medium">Выполнено за все время:</h2>
				<p className="text text_type_digits-large">12332</p>
			</div>
			<div className={styles.totalToday}>
				<h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
				<p className="text text_type_digits-large">412</p>
			</div>
		</section>
	);
};

export default FeedInfo;
