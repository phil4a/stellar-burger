import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import {
	profileWsConnect,
	profileWsDisconnect,
} from '../../services/websockets/profile-feed/actions';
import { getProfileOrders } from '../../services/websockets/profile-feed/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

import { WS_URL } from '../../utils/api';
import FeedList from '../orders-feed/feed-list/feed-list';

const ProfileFeed = () => {
	const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');

	const dispatch = useAppDispatch();
	const match = useMatch('/profile/orders');
	const orders = useAppSelector(getProfileOrders);

	useEffect(() => {
		if (match) {
			dispatch(profileWsConnect(`${WS_URL}?token=${accessToken}`));
			console.log('mounted profile');
			return () => {
				dispatch(profileWsDisconnect());
				console.log('unmounted profile');
			};
		}
	}, [dispatch, match]);

	return <FeedList orders={orders} />;
};

export default ProfileFeed;
