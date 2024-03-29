import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-tabs.module.css';

const IngredientTabs = () => {
	const [current, setCurrent] = useState('Булки');
	return (
		<>
			<div className={`${styles.tabs}`}>
				<Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
		</>
	);
};

export default IngredientTabs;
