import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

import appStyles from './App.module.css';

import { data as ingredients } from './utils/data';

const App = () => {
	return (
		<>
			<AppHeader></AppHeader>
			<main className={appStyles.container}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</>
	);
};

export default App;
