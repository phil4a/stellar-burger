import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderNav from './header-nav/header-nav';
import HeaderProfileButton from './header-profile-button/header-profile.button';

const AppHeader = () => {
	return (
		<header className={headerStyles.header}>
			<div className={headerStyles.container}>
				<HeaderNav />
				<Logo />
				<HeaderProfileButton />
			</div>
		</header>
	);
};

export default AppHeader;
