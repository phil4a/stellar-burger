import styles from './modal-overlay.module.css';
import propTypes from 'prop-types';

const ModalOverlay = ({ hide }) => {
	return <div onClick={hide} className={styles.backdrop}></div>;
};
ModalOverlay.propTypes = {
	hide: propTypes.func.isRequired,
};

export default ModalOverlay;
