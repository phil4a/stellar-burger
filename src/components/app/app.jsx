import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import appStyles from './app.module.css';

import { data as ingredients } from '../../utils/data';

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
