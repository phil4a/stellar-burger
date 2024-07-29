import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import OrderInfo from '../order-info/order-info';
import styles from './feed-list.module.css';
import { IWebsocketOrder } from '../../../utils/websockets-types';
import { wsConnect, wsDisconnect } from '../../../services/websockets/order-feed/actions';
import { useAppDispatch } from '../../../services/store';

import { WS_URL } from '../../../utils/api';

interface FeedListProps {
	orders: IWebsocketOrder[];
}

const FeedList = ({ orders }: FeedListProps) => {
	const accessToken = localStorage.getItem('accessToken')?.slice(7);

	const dispatch = useAppDispatch();
	const match = useMatch('/profile/orders');

	useEffect(() => {
		if (match) {
			dispatch(wsConnect(`${WS_URL}?token=${accessToken}`));
			return () => {
				dispatch(wsDisconnect());
			};
		}
	}, [dispatch, match]);

	return (
		<ul className={styles.list}>
			{orders.map((order, i) => (
				<OrderInfo order={order} key={order._id} />
			))}
		</ul>
	);
};

export default FeedList;
