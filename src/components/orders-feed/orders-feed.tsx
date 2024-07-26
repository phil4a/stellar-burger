import FeedInfo from './feed-info/feed-info';
import FeedList from './feed-list/feed-list';
import styles from './orders-feed.module.css';

const OrdersFeed = (): JSX.Element => {
	return (
		<>
			<section className={`${styles.section} pt-10 mr-10`}>
				<h1 className="text text_type_main-large pb-5">Лента заказов</h1>
				<FeedList />
			</section>
			<FeedInfo />
		</>
	);
};

export default OrdersFeed;
