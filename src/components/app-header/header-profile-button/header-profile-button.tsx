import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useAppSelector } from '../../../services/store';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './header-profile-button.module.css';

const HeaderProfileButton: React.FC = () => {
	const { name } = useAppSelector((state) => state.auth.user);
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
