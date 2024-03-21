import { useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import OrderDetails from '../modals/order-details/order-details';

import appStyles from './app.module.css';

import { useEffect } from 'react';

//Todo
//! Улучшить быстродействие, добавить мемоизацию
const App = () => {
	const API_URL = 'https://norma.nomoreparties.space/api';
	const [state, setState] = useState({
		isLoading: true,
		hasError: false,
		ingredients: [],
		isShowModal: false,
		currentModal: null,
		currentIngredient: {},
	});

	useEffect(() => {
		const getIngredientsFromServer = async () => {
			try {
				const response = await fetch(`${API_URL}/ingredients`);
				const data = await response.json();
				setState({ ...state, ingredients: data.data, isLoading: false });
			} catch (error) {
				setState({ ...state, hasError: true, isLoading: false });
			}
		};
		getIngredientsFromServer();
	}, []);

	const handleOpenModal = (modalType, ingredient = {}) => {
		setState({
			...state,
			isShowModal: true,
			currentModal: modalType,
			currentIngredient: ingredient,
		});
	};
	const handleCloseModal = () => {
		setState({ ...state, isShowModal: false, currentModal: null, currentIngredient: {} });
	};
	return (
		<>
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				{state.isLoading && 'Загрузка данных...'}
				{state.hasError && 'Произошла ошибка при загрузке данных'}
				{!state.isLoading && !state.hasError && (
					<>
						<BurgerIngredients ingredients={state.ingredients} show={handleOpenModal} />
						<BurgerConstructor ingredients={state.ingredients} show={handleOpenModal} />
					</>
				)}
				{state.isShowModal && (
					<Modal hide={handleCloseModal}>
						{state.currentModal === 'orderDetails' && <OrderDetails />}
						{state.currentModal === 'ingredientDetails' && (
							<IngredientDetails props={state.currentIngredient} />
						)}
					</Modal>
				)}
			</main>
		</>
	);
};

export default App;
