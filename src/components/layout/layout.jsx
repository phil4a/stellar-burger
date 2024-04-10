import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';

const Layout = () => {
	return (
		<main className={styles.container}>
			<Outlet />
		</main>
	);
};

export default Layout;
