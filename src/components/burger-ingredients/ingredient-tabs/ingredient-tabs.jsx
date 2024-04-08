import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

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

export default IngredientTabs;
