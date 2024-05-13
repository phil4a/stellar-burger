import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import propTypes from 'prop-types';

import styles from './ingredient-tabs.module.css';

const IngredientTabs = ({ activeTab, onTabClick }) => {
	return (
		<div className={styles.tabs}>
			<Tab value="Булки" active={activeTab === 'Булки'} onClick={() => onTabClick('Булки')}>
				Булки
			</Tab>
			<Tab value="Соусы" active={activeTab === 'Соусы'} onClick={() => onTabClick('Соусы')}>
				Соусы
			</Tab>
			<Tab value="Начинки" active={activeTab === 'Начинки'} onClick={() => onTabClick('Начинки')}>
				Начинки
			</Tab>
		</div>
	);
};

IngredientTabs.propTypes = {
	activeTab: propTypes.string.isRequired,
	onTabClick: propTypes.func.isRequired,
};
export default IngredientTabs;
