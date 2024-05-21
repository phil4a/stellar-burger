import styles from './modal-overlay.module.css';
import propTypes from 'prop-types';

const ModalOverlay: React.FC<{ onClose: React.MouseEventHandler<HTMLDivElement> }> = ({
	onClose,
}): React.ReactElement => {
	return <div onClick={onClose} className={styles.backdrop}></div>;
};
ModalOverlay.propTypes = {
	onClose: propTypes.func.isRequired,
};

export default ModalOverlay;
