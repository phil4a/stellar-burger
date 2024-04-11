import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector } from 'react-redux';
import styles from './header-profile-button.module.css';

const HeaderProfileButton = () => {
	const { name } = useSelector((state) => state.auth.user);
	return (
		<button className={`${styles.item} text text_type_main-default text_color_inactive`}>
			<ProfileIcon type="secondary" />
			<span>{name ? name : 'Личный кабинет'}</span>
		</button>
	);
};

export default HeaderProfileButton;
