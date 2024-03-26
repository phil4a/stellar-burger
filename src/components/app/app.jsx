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
	const [orderNumber, setOrderNumber] = useState(null);

	const requestOrder = async (ingredientIds) => {
		const response = await fetch(`${API_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients: ingredientIds }),
		});
		if (!response.ok) {
			throw new Error('Ошибка сервера');
		}
		return await response.json();
	};

	const sendOrder = (ingredientIds) => {
		requestOrder(ingredientIds)
			.then((data) => {
				if (data.success) {
					setOrderNumber(data.order.number);
					handleOpenModal('orderDetails');
				} else {
					throw new Error('Ошибка получения заказа');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

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
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				{state.isLoading && 'Загрузка данных...'}
				{state.hasError && 'Произошла ошибка при загрузке данных'}
				{!state.isLoading && !state.hasError && (
					<IngredientsContext.Provider value={{ ingredients }}>
						<>
							<BurgerIngredients show={handleOpenModal} />
							<BurgerConstructor sendOrder={sendOrder} />
						</>
					</IngredientsContext.Provider>
				)}
				{state.isShowModal && (
					<Modal hide={handleCloseModal}>
						{state.currentModal === 'orderDetails' && <OrderDetails orderNumber={orderNumber} />}
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
