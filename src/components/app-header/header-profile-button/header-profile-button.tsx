import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './header-profile-button.module.css';

import { RootState } from '../../../services/store';

const HeaderProfileButton: React.FC = () => {
	const { name } = useSelector((state: RootState) => state.auth.user);
	const location = useLocation();
	const profileActive = location.pathname.includes('/profile');

	return (
		<NavLink
			to={'/profile'}
			className={`${styles.item} text text_type_main-default text_color_inactive`}>
			<ProfileIcon type={profileActive ? 'primary' : 'secondary'} />
			<span>{name ? name : 'Личный кабинет'}</span>
		</NavLink>
	);
};

export default HeaderProfileButton;
