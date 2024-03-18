import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ children, hide }) => {
	const modalRoot = document.querySelector('#modals');

	return ReactDOM.createPortal(
		<>
			<div className={styles.wrapper}>
				<button className={styles.close} onClick={hide}>
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<div onClick={hide} className={styles.backdrop}></div>
		</>,
		modalRoot,
	);
};

export default Modal;
