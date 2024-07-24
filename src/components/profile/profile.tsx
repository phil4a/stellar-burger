import { useAppDispatch } from '../../services/store';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../services/auth/auth-slice';

import ProfilePersonal from './profile-personal/profile-personal';
import ProfileOrders from './profile-orders/profile-orders';

import styles from './profile.module.css';

const Profile: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const handleLogoutClick = (): void => {
		dispatch(logout());
		navigate('/', { replace: true });
	};

	const renderAside = () => {
		if (pathname === '/profile/orders') {
			return <ProfileOrders />;
		}
		return <ProfilePersonal />;
	};

	const getLinkClassName = (path: string) => {
		return pathname === path ? `${styles.link} ${styles.active}` : styles.link;
	};

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
