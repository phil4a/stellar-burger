import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-info.module.css';

type Props = {};

const OrderInfo = (props: Props) => {
	const location = useLocation();

	return (
		<li className={styles.item}>
			<Link to={'/feed/123'} className={styles.link} state={{ background: location }}>
				<div className={styles.info}>
					<span className="text text_type_digits-default">#034535</span>
					<span className="text text_type_main-default ml-2">Сегодня, 16:20</span>
				</div>
				<h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
				<div className={styles.list}>
					<ul className={styles.orderItems}>
						<li className={styles.orderItem}>
							<img
								className={styles.orderItemImg}
								src="https://code.s3.yandex.net/react/code/bun-02.png"
								alt="burger"
							/>
						</li>
						<li className={styles.orderItem}>
							<img
								className={styles.orderItemImg}
								src="https://code.s3.yandex.net/react/code/bun-01.png"
								alt="burger"
							/>
						</li>
						<li className={styles.orderItem}>
							<img
								className={styles.orderItemImg}
								src="https://code.s3.yandex.net/react/code/meat-01.png"
								alt="burger"
							/>
						</li>
						<li className={styles.orderItem}>
							<img
								className={styles.orderItemImg}
								src="https://code.s3.yandex.net/react/code/core.png"
								alt="burger"
							/>
						</li>
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
