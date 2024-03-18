import { useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import appStyles from './app.module.css';

import { useEffect } from 'react';

const App = () => {
	const API_URL = 'https://norma.nomoreparties.space/api';
	const [state, setState] = useState({
		isLoading: true,
		hasError: false,
		ingredients: [],
	});

	useEffect(() => {
		const getIngredients = () => {
			setState({ ...state, hasError: false, isLoading: true });
			fetch(`${API_URL}/ingredients`)
				.then((res) => res.json())
				.then((data) => {
					setState({ ...state, ingredients: data.data, isLoading: false });
				})
				.catch((e) => {
					setState({ ...state, hasError: true, isLoading: false });
				});
		};
		getIngredients();
	}, []);
	return (
		<>
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				{state.isLoading && 'Загрузка данных...'}
				{state.hasError && 'Произошла ошибка при загрузке данных'}
				{!state.isLoading && !state.hasError && (
					<>
						<BurgerIngredients ingredients={state.ingredients} />
						<BurgerConstructor ingredients={state.ingredients} />
					</>
				)}
			</main>
		</>
	);
};

export default App;
