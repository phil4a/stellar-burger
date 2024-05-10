import ReactDOM from 'react-dom';
import styles from './preloader.module.css';
import Spinner from '../../images/spinner.svg';

const preloaderRoot = document.querySelector('#preloader');

const Preloader = () => {
	return ReactDOM.createPortal(
		<div className={styles.preloader}>
			<img src={Spinner} className={styles.spinner} alt="Loading" />
		</div>,
		preloaderRoot,
	);
};

export default Preloader;
