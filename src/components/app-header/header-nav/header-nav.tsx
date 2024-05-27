import { NavLink, useLocation } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './header-nav.module.css';

const HeaderNav: React.FC = () => {
	const location = useLocation();
	const homeActive = location.pathname === '/';
	return (
		<nav className="text text_type_main-default">
			<ul className={styles.list}>
				<li className="text text_type_main-default">
					<NavLink className={styles.item} to={'/'}>
						<BurgerIcon type={homeActive ? 'primary' : 'secondary'} />
						<span>Конструктор</span>
					</NavLink>
				</li>
				<li className={`${styles.item} text_color_inactive`}>
					<NavLink className={styles.item} to={'/feed'}>
						<ListIcon type="secondary" />
						<span>Лента заказов</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default HeaderNav;
