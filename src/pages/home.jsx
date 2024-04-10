import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentIngredient } from '../services/current-ingredient-slice';
import { getIngredientsFromServer } from '../services/ingredients-slice';
import { clearCurrentOrder } from '../services/order-slice';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

import Modal from '../components/modals/modal/modal';
import IngredientDetails from '../components/modals/ingredient-details/ingredient-details';
import OrderDetails from '../components/modals/order-details/order-details';

const Home = () => {
	const dispatch = useDispatch();
	const ingredientsStatus = useSelector((state) => state.ingredients.status);
	const error = useSelector((state) => state.ingredients.error);
	const [state, setState] = useState({
		isShowModal: false,
		currentModal: null,
	});

	useEffect(() => {
		if (ingredientsStatus === 'idle') {
			dispatch(getIngredientsFromServer());
		}
	}, [ingredientsStatus, dispatch]);

	const handleOpenModal = (modalType, ingredient = {}) => {
		setState({
			...state,
			isShowModal: true,
			currentModal: modalType,
		});
		dispatch(setCurrentIngredient(ingredient));
	};
	const handleCloseModal = () => {
		setState({ ...state, isShowModal: false, currentModal: null });
		dispatch(setCurrentIngredient({}));
		dispatch(clearCurrentOrder());
	};

	return (
		<>
			{ingredientsStatus === 'loading' && 'Загрузка данных...'}
			{ingredientsStatus === 'failed' && `Произошла ошибка при загрузке данных: ${error}`}
			{ingredientsStatus === 'succeeded' && (
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients show={handleOpenModal} />
					<BurgerConstructor show={handleOpenModal} />
				</DndProvider>
			)}
			{state.isShowModal && (
				<Modal hide={handleCloseModal}>
					{state.currentModal === 'orderDetails' && <OrderDetails />}
					{state.currentModal === 'ingredientDetails' && <IngredientDetails />}
				</Modal>
			)}
		</>
	);
};

export default Home;
