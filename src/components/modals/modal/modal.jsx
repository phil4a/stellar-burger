import ReactDOM from 'react-dom';
import { useEffect } from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';
import propTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ children, onClose }) => {
	const handleCloseModal = () => {
		onClose();
	};

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				handleCloseModal();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	const modalRoot = document.querySelector('#modals');

	return ReactDOM.createPortal(
		<>
			<div className={styles.wrapper}>
				<button className={styles.close} onClick={handleCloseModal}>
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<ModalOverlay onClose={handleCloseModal} />
		</>,
		modalRoot,
	);
};
Modal.propTypes = {
	children: propTypes.node.isRequired,
	onClose: propTypes.func.isRequired,
};

export default Modal;
