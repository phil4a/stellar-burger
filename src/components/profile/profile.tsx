import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/websockets/profile-feed/actions';
import { getOrders } from '../../services/websockets/profile-feed/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../services/auth/auth-slice';

import ProfilePersonal from './profile-personal/profile-personal';
import FeedList from '../orders-feed/feed-list/feed-list';

import { WS_URL } from '../../utils/api';

import styles from './profile.module.css';

const Profile: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

	const orders = useAppSelector(getOrders);

	const handleLogoutClick = (): void => {
		dispatch(logout());
		navigate('/', { replace: true });
	};

	const renderAside = () => {
		if (pathname === '/profile/orders') {
			return <FeedList orders={orders} />;
		}
		return <ProfilePersonal />;
	};

	const getLinkClassName = (path: string) => {
		return pathname === path ? `${styles.link} ${styles.active}` : styles.link;
	};
	console.log(WS_URL);
	console.log(accessToken);
	useEffect(() => {
		// dispatch(wsConnect(`${WS_URL}?token=${accessToken}`));
		dispatch(wsConnect(`${WS_URL}/all`));
	}, [dispatch]);

	return (
		<div className={styles.profile}>
			<ul className={styles.actions}>
				<li className="text text_type_main-medium pt-2 pb-4">
					<Link
						to="/profile"
						className={` ${getLinkClassName('/profile')} text text_type_main-medium pt-2 pb-4`}>
						Профиль
					</Link>
				</li>
				<li className="text text_type_main-medium pt-2 pb-4">
					<Link
						to="/profile/orders"
						className={`${getLinkClassName(
							'/profile/orders',
						)} text text_type_main-medium pt-2 pb-4`}>
						История заказов
					</Link>
				</li>
				<li
					onClick={handleLogoutClick}
					className="text text_type_main-medium pt-2 pb-4 text_color_inactive">
					Выход
				</li>
				<p className="text text_type_main-default text_color_inactive pt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</ul>
			<aside className={styles.aside}>{renderAside()}</aside>
		</div>
	);
};

export default Profile;
