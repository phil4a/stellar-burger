import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentIngredient } from '../../services/current-ingredient-slice';
import { getIngredientsFromServer } from '../../services/ingredients-slice';
import { clearCurrentOrder } from '../../services/order-slice';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Modal from '../modals/modal/modal';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import OrderDetails from '../modals/order-details/order-details';

import appStyles from './app.module.css';

//TODO
// 1. Создадим хранилище заказа
// 2. Перенести фукнционал создания заказа
// 3. Переключение табов:
// - использовать getboundingclientrect. Создать несколько 4 рефов. Одну ссылку привязать к контейнеру оборачивающие табы.
// 3 остальных привязать к заголовкам подгруппы. В обработчике события скролла (onScroll), с помощью getboundingclientrect расчитать растояние
// между нижней границей табов и верхней границей каждого из заголовков. Делать активным таб, чья подгруппа ближе всего к верхней части
// 4. Перетаскивание:
// - добавить плейсхолдеры для булок сверху и снизу - одна булка по сути. И для начинки
// - добавить счетчик ингридиентов на блок с игридиентами
// {
// 	id1: count1
// 	id2: count2
// }
// - сделать возможность перетаскивать несколько одинаковых ингридиентов - подключить библиотеку для генерации уникальных ключей uuid
// 5. Создать хранилище для конструктора в виде:
//  {
// bun: null,
// ingredient: []
// }
// -изменять массив ингридиентов при сортировке перетаскиванием можно с помощью метода splice
// const ingredients = [...state.ingredients];
// ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
// 6. Расчет полной своимости и счетчиков ингридиентов лучше реализовать в useMemo или createSelector
// - const totalPrice = useMemo(()=> {
// 	return **расчет стоимости **
// }, burgersData)

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
					<>
						<BurgerIngredients show={handleOpenModal} />
						<BurgerConstructor show={handleOpenModal} />
					</>
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
