import React from 'react';
import styles from './order-info.module.css';

type Props = {};

const OrderInfo = (props: Props) => {
	return (
		<li className={styles.item}>
			<div className={styles.info}>
				<span className="text text_type_digits-default">#034535</span>
				<span className="text text_type_main-default ml-2">Сегодня, 16:20</span>
			</div>
			<h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
		</li>
	);
};

export default OrderInfo;
