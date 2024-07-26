import OrderInfo from '../order-info/order-info';
import styles from './feed-list.module.css';

const FeedList = () => {
	return (
		<ul className={styles.list}>
			<OrderInfo />
			<OrderInfo />
			<OrderInfo />
			<OrderInfo />
		</ul>
	);
};

export default FeedList;
