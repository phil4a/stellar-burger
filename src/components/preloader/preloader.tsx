import ReactDOM from 'react-dom';
import styles from './preloader.module.css';
import Spinner from '../../images/spinner.svg';

const preloaderRoot = document.querySelector('#preloader');

const Preloader = (): React.ReactPortal => {
	return ReactDOM.createPortal(
		<div className={styles.preloader}>
			<img src={Spinner} className={styles.spinner} alt="Loading" />
		</div>,
		preloaderRoot as HTMLDivElement,
	) as React.ReactPortal;
};

export default Preloader;
