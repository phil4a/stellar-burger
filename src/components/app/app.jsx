import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { IngredientsContext } from '../../services/ingredients-context';

import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import OrderDetails from '../modals/order-details/order-details';

import appStyles from './app.module.css';

const App = () => {
	const API_URL = 'https://norma.nomoreparties.space/api';
	const [state, setState] = useState({
		isLoading: true,
		hasError: false,
		isShowModal: false,
		currentModal: null,
		currentIngredient: {},
	});
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		const getIngredientsFromServer = async () => {
			try {
				const response = await fetch(`${API_URL}/ingredients`);
				if (!response.ok) {
					return Promise.reject(`Ошибка ${response.status}`);
				}
				const data = await response.json();
				setState({ ...state, isLoading: false });
				setIngredients(data.data);
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
			<IngredientsContext.Provider value={{ ingredients }}>
				<AppHeader></AppHeader>
				<main className={appStyles.container}>
					{state.isLoading && 'Загрузка данных...'}
					{state.hasError && 'Произошла ошибка при загрузке данных'}
					{!state.isLoading && !state.hasError && (
						<>
							<BurgerIngredients ingredients={ingredients} show={handleOpenModal} />
							<BurgerConstructor ingredients={ingredients} show={handleOpenModal} />
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
			</IngredientsContext.Provider>
		</>
	);
};

export default App;
