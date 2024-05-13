import styles from './modal-overlay.module.css';
import propTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return <div onClick={onClose} className={styles.backdrop}></div>;
};
ModalOverlay.propTypes = {
	onClose: propTypes.func.isRequired,
};

export default ModalOverlay;
