import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-tabs.module.css';

const IngredientTabs = () => {
	const [current, setCurrent] = useState('Булки');
	const tabsContainerRef = useRef(null);

	return (
		<>
			<div ref={tabsContainerRef} className={`${styles.tabs}`}>
				<Tab value="Булки" active={current === 'Булки'}>
					Булки
				</Tab>
				<Tab value="Начинки" active={current === 'Начинки'}>
					Начинки
				</Tab>
				<Tab value="Соусы" active={current === 'Соусы'}>
					Соусы
				</Tab>
			</div>
		</>
	);
};

export default IngredientTabs;
