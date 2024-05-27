import FeedInfo from './feed-info/feed-info';
import OrderInfo from './order-info/order-info';
import styles from './orders-feed.module.css';

type Props = {};

const OrdersFeed = (props: Props): JSX.Element => {
	return (
		<>
			<section className={`${styles.section} pt-10 mr-10`}>
				<h1 className="text text_type_main-large pb-5">Лента заказов</h1>
				<ul className={styles.list}>
					<OrderInfo />
					<OrderInfo />
					<OrderInfo />
					<OrderInfo />
				</ul>
			</section>
			<FeedInfo />
		</>
	);
};

export default OrdersFeed;
