import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import {
	profileWsConnect,
	profileWsDisconnect,
} from '../../services/websockets/profile-feed/actions';
import { getProfileOrders } from '../../services/websockets/profile-feed/slice';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';

import { WS_URL } from '../../utils/api';
import FeedList from '../orders-feed/feed-list/feed-list';
import { WebsocketStatus } from '../../utils/websockets-types';
import Preloader from '../preloader/preloader';

const ProfileFeed = () => {
	const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');

	const dispatch = useAppDispatch();
	const match = useMatch('/profile/orders');
	const orders = useAppSelector(getProfileOrders);

	const wsStatus = useAppSelector((state: RootState) => state.profileOrders.status);

	useEffect(() => {
		if (match) {
			dispatch(profileWsConnect(`${WS_URL}?token=${accessToken}`));

			return () => {
				dispatch(profileWsDisconnect());
			};
		}
	}, [dispatch, match]);

	if (wsStatus !== WebsocketStatus.ONLINE) {
		return <Preloader />;
	}
	const reversedOrders = [...orders].reverse();

	return <FeedList orders={reversedOrders} />;
};

export default ProfileFeed;
