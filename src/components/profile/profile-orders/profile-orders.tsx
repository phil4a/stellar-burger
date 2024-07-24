import OrderInfo from '../../orders-feed/order-info/order-info';
import styles from './profile-orders.module.css';

const ProfileOrders = () => {
	return (
		<ul className={styles.list}>
			<OrderInfo />
			<OrderInfo />
			<OrderInfo />
		</ul>
	);
};

export default ProfileOrders;
