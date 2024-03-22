import {
	BurgerIcon,
	ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './header-nav.module.css';

const HeaderNav = () => {
	return (
		<nav className="text text_type_main-default">
			<ul className={styles.list}>
				<li className={styles.item}>
					<BurgerIcon type="primary" />
					<span>Конструктор</span>
				</li>
				<li className={`${styles.item} text_color_inactive`}>
					<ListIcon type="secondary" />
					<span>Лента заказов</span>
				</li>
			</ul>
		</nav>
	);
};

export default HeaderNav;
