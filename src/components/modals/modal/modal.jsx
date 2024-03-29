import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import propTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ children, hide }) => {
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				hide();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [hide]);

	const modalRoot = document.querySelector('#modals');

	return ReactDOM.createPortal(
		<>
			<div className={styles.wrapper}>
				<button className={styles.close} onClick={hide}>
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<ModalOverlay hide={hide} />
		</>,
		modalRoot,
	);
};
Modal.propTypes = {
	children: propTypes.node.isRequired,
	hide: propTypes.func.isRequired,
};

export default Modal;
