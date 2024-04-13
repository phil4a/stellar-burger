import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentIngredient } from '../../../services/current-ingredient-slice';
import ModalOverlay from '../modal-overlay/modal-overlay';
import propTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ children }) => {
	const { ingredientId } = useParams();
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCloseModal = () => {
		dispatch(setCurrentIngredient({}));
		navigate(-1);
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
	}, []);

	useEffect(() => {
		if (ingredientId) {
			const ingredientData = ingredients.find((ing) => ing._id === ingredientId);
			if (ingredientData) {
				dispatch(setCurrentIngredient(ingredientData));
			}
		}
	}, [ingredientId, dispatch, ingredients]);

	const modalRoot = document.querySelector('#modals');

	return ReactDOM.createPortal(
		<>
			<div className={styles.wrapper}>
				<button className={styles.close} onClick={handleCloseModal}>
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<ModalOverlay hide={handleCloseModal} />
		</>,
		modalRoot,
	);
};
Modal.propTypes = {
	children: propTypes.node.isRequired,
	hide: propTypes.func.isRequired,
};

export default Modal;
