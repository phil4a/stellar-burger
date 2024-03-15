import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './header-profile-button.module.css';
const HeaderProfileButton = () => {
	return (
		<button className={`${styles.item} text text_type_main-default text_color_inactive`}>
			<ProfileIcon type="secondary" />
			<span>Личный кабинет</span>
		</button>
	);
};

export default HeaderProfileButton;
