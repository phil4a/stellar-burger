import styles from './modal-overlay.module.css';

const ModalOverlay: React.FC<{ onClose: React.MouseEventHandler<HTMLDivElement> }> = ({
	onClose,
}): React.ReactElement => {
	return <div onClick={onClose} className={styles.backdrop}></div>;
};

export default ModalOverlay;
