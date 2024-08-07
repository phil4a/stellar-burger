import ReactDOM from 'react-dom';
import { useEffect } from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
	children,
	onClose,
}): React.ReactPortal => {
	const handleCloseModal = (): void => {
		onClose();
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent): void => {
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
			<div data-test-id="modal" className={styles.wrapper}>
				<button className={styles.close} onClick={handleCloseModal} aria-label="Закрыть">
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<ModalOverlay onClose={handleCloseModal} />
		</>,
		modalRoot as HTMLDivElement,
	);
};

export default Modal;
