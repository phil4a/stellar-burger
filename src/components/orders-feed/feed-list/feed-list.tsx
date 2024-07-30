import OrderInfo from '../order-info/order-info';
import styles from './feed-list.module.css';
import { IWebsocketOrder } from '../../../utils/websockets-types';

interface FeedListProps {
	orders: IWebsocketOrder[];
}

const FeedList = ({ orders }: FeedListProps) => {
	return (
		<ul className={styles.list}>
			{orders.map((order, i) => (
				<OrderInfo order={order} key={order._id} />
			))}
		</ul>
	);
};

export default FeedList;
