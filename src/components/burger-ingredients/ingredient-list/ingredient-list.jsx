import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';

import styles from './ingredient-list.module.css';

const IngredientList = ({}) => {
	const wrapperRef = useRef(null);
	const [activeTab, setActiveTab] = useState('Булки');

	const refs = {
		bun: useRef(null),
		sauce: useRef(null),
		main: useRef(null),
	};

	const { ingredients } = useSelector((store) => store.ingredients);

	const getIngredientType = (type) => {
		switch (type) {
			case 'bun':
				return 'Булки';
			case 'sauce':
				return 'Соусы';
			case 'main':
				return 'Начинки';
			default:
				return 'Неизвестная категория';
		}
	};

	const handleScroll = () => {
		const wrapperBounds = wrapperRef.current.getBoundingClientRect();
		const distances = Object.keys(refs).map((key) => {
			const bounds = refs[key].current.getBoundingClientRect();
			return {
				type: key,
				distance: Math.abs(bounds.top - wrapperBounds.top),
			};
		});
		const closest = distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
		setActiveTab(getIngredientType(closest.type));
	};
	const onTabClick = (tabName) => {
		const type = tabName.toLowerCase();
		const refKey = type === 'булки' ? 'bun' : type === 'соусы' ? 'sauce' : 'main';
		const ref = refs[refKey];

		ref.current.scrollIntoView({ behavior: 'smooth' });
		setActiveTab(tabName);
	};

	return (
		<>
			<IngredientTabs activeTab={activeTab} onTabClick={onTabClick} />
			<div ref={wrapperRef} className={styles.wrapper} onScroll={handleScroll}>
				{Object.keys(refs).map((type) => (
					<div key={type} ref={refs[type]}>
						<h2 className="text text_type_main-medium mt-10 mb-6">{getIngredientType(type)}</h2>
						<ul className={`${styles.list} pl-4`}>
							{ingredients
								.filter((ingredient) => ingredient.type === type)
								.map((ingredient) => (
									<IngredientItem
										key={ingredient._id}
										//  show={show}
										ingredient={ingredient}
									/>
								))}
						</ul>
					</div>
				))}
			</div>
		</>
	);
};

export default IngredientList;
