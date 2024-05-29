import React from 'react';
import styles from './feed-info.module.css';
type Props = {};

const FeedInfo = (props: Props) => {
	return (
		<section className={`${styles.section} pt-25`}>
			<div className={styles.orders}>
				<div className={styles.ready}>
					<h2 className="text text_type_main-medium pb-6">Готовы:</h2>
					<ul className={`text text_type_digits-default ${styles.list} ${styles.readyList}`}>
						<li>034533</li>
						<li>034532</li>
						<li>034530</li>
						<li>034527</li>
						<li>034525</li>
					</ul>
				</div>
				<div className={styles.inProgress}>
					<h2 className="text text_type_main-medium pb-6">В работе:</h2>
					<ul className={`text text_type_digits-default ${styles.list}`}>
						<li>034538</li>
						<li>034541</li>
						<li>034542</li>
					</ul>
				</div>
			</div>
			<div className={styles.total}>
				<h2 className="text text_type_main-medium">Выполнено за все время:</h2>
				<p className="text text_type_digits-large">28752</p>
			</div>
			<div className={styles.totalToday}>
				<h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
				<p className="text text_type_digits-large">248</p>
			</div>
		</section>
	);
};

export default FeedInfo;
