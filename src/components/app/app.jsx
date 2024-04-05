import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentIngredient } from '../../services/current-ingredient-slice';
import { getIngredientsFromServer } from '../../services/ingredients-slice';
import { clearCurrentOrder } from '../../services/order-slice';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import OrderDetails from '../modals/order-details/order-details';

import appStyles from './app.module.css';

const App = () => {
	const dispatch = useDispatch();
	const ingredientsStatus = useSelector((state) => state.ingredients.status);
	const error = useSelector((state) => state.ingredients.error);
	const [state, setState] = useState({
		isLoading: true,
		hasError: false,
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
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				{ingredientsStatus === 'loading' && 'Загрузка данных...'}
				{ingredientsStatus === 'failed' && `Произошла ошибка при загрузке данных: ${error}`}
				{ingredientsStatus === 'succeeded' && (
					<DndProvider backend={HTML5Backend}>
						<>
							<BurgerIngredients show={handleOpenModal} />
							<BurgerConstructor show={handleOpenModal} />
						</>
					</DndProvider>
				)}
				{state.isShowModal && (
					<Modal hide={handleCloseModal}>
						{state.currentModal === 'orderDetails' && <OrderDetails />}
						{state.currentModal === 'ingredientDetails' && <IngredientDetails />}
					</Modal>
				)}
			</main>
		</>
	);
};

export default App;
