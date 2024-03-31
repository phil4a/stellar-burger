import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentIngredient } from '../../services/current-ingredient-slice';
import { getIngredientsFromServer } from '../../services/ingredients-slice';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import OrderDetails from '../modals/order-details/order-details';

import appStyles from './app.module.css';

import { API_URL } from '../../utils/constants';

//TODO
//* Сделать DND
//* Сделать стор для конструктора бургера
//* Подумать как улучшить код для открытия конкретного игридиента
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

	const [orderNumber, setOrderNumber] = useState(null);

	// const requestOrder = async (ingredientIds) => {
	// 	const response = await fetch(`${API_URL}/orders`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ ingredients: ingredientIds }),
	// 	});
	// 	if (!response.ok) {
	// 		throw new Error('Ошибка сервера');
	// 	}
	// 	return await response.json();
	// };

	// const sendOrder = (ingredientIds) => {
	// 	requestOrder(ingredientIds)
	// 		.then((data) => {
	// 			if (data.success) {
	// 				setOrderNumber(data.order.number);
	// 				handleOpenModal('orderDetails');
	// 			} else {
	// 				throw new Error('Ошибка получения заказа');
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// };

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
	};
	return (
		<>
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				{ingredientsStatus === 'loading' && 'Загрузка данных...'}
				{ingredientsStatus === 'failed' && `Произошла ошибка при загрузке данных: ${error}`}
				{ingredientsStatus === 'succeeded' && (
					<>
						<BurgerIngredients show={handleOpenModal} />
						{/* <BurgerConstructor sendOrder={sendOrder} /> */}
						<BurgerConstructor />
					</>
				)}
				{state.isShowModal && (
					<Modal hide={handleCloseModal}>
						{state.currentModal === 'orderDetails' && <OrderDetails orderNumber={orderNumber} />}
						{state.currentModal === 'ingredientDetails' && <IngredientDetails />}
					</Modal>
				)}
			</main>
		</>
	);
};

export default App;
