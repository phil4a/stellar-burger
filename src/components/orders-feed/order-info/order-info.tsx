import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-info.module.css';

import { IWebsocketOrder } from '../../../utils/websockets-types';

interface IOrderInfoProps {
	order: IWebsocketOrder;
}

const OrderInfo = ({ order }: IOrderInfoProps) => {
	const location = useLocation();

	const { ingredients, _id, status, number, createdAt, updatedAt, name } = order;

	return (
		<li className={styles.item}>
			<Link to={'/feed/123'} className={styles.link} state={{ background: location }}>
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
						{ingredients.map((ingredient) => (
							<li className={styles.orderItem}>
								<img
									className={styles.orderItemImg}
									src="https://code.s3.yandex.net/react/code/bun-02.png"
									alt="burger"
								/>
							</li>
						))}
					</ul>
					<div className={styles.price}>
						<span className="text text_type_digits-default">1000</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</Link>
		</li>
	);
};

export default OrderInfo;
