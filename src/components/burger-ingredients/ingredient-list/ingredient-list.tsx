import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';

import styles from './ingredient-list.module.css';

import { TODO_ANY, IIngredient } from '../../../utils/types';

const IngredientList: React.FC = (): JSX.Element => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<string>('Булки');

	const refs: {
		[key: string]: React.RefObject<HTMLDivElement>;
	} = {
		bun: useRef<HTMLDivElement>(null),
		sauce: useRef<HTMLDivElement>(null),
		main: useRef<HTMLDivElement>(null),
	};

	const { ingredients } = useSelector((store: TODO_ANY) => store.ingredients);

	const getIngredientType = (type: string): string => {
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

	const handleScroll = (): void => {
		if (!wrapperRef.current) return;

		const wrapperBounds = wrapperRef.current.getBoundingClientRect();
		const distances = Object.keys(refs).map((key) => {
			const bounds = refs[key].current?.getBoundingClientRect();
			return {
				type: key,
				distance: bounds ? Math.abs(bounds.top - wrapperBounds.top) : Infinity,
			};
		});
		const closest = distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
		setActiveTab(getIngredientType(closest.type));
	};

	const onTabClick = (tabName: string): void => {
		const type = tabName.toLowerCase();
		const refKey = type === 'булки' ? 'bun' : type === 'соусы' ? 'sauce' : 'main';
		const ref = refs[refKey];

		ref.current?.scrollIntoView({ behavior: 'smooth' });
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
								.filter((ingredient: IIngredient) => ingredient.type === type)
								.map((ingredient: IIngredient) => (
									<IngredientItem key={ingredient._id} ingredient={ingredient} />
								))}
						</ul>
					</div>
				))}
			</div>
		</>
	);
};

export default IngredientList;
