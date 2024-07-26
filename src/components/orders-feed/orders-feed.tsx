import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/websockets/order-feed/actions';
import {
	getOrders,
	getTotalOrders,
	getTotalTodayOrders,
} from '../../services/websockets/order-feed/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

import FeedInfo from './feed-info/feed-info';
import FeedList from './feed-list/feed-list';

import { WS_URL } from '../../utils/api';

import styles from './orders-feed.module.css';

const OrdersFeed = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector(getOrders);
	const totalOrderNum = useAppSelector(getTotalOrders);
	const totalOrderTodayNum = useAppSelector(getTotalTodayOrders);

	useEffect(() => {
		dispatch(wsConnect(`${WS_URL}/all`));
	}, [dispatch]);
	return (
		<>
			<section className={`${styles.section} pt-10 mr-10`}>
				<h1 className="text text_type_main-large pb-5">Лента заказов</h1>
				<FeedList orders={orders} />
			</section>
			<FeedInfo orders={orders} total={totalOrderNum} totalToday={totalOrderTodayNum} />
		</>
	);
};

export default OrdersFeed;
