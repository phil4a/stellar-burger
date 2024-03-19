import styles from './modal-overlay.module.css';

const ModalOverlay = ({ hide }) => {
	return <div onClick={hide} className={styles.backdrop}></div>;
};

export default ModalOverlay;
