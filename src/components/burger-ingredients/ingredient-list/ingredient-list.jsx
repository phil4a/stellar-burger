import React, { useContext } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredient-list.module.css';

import propTypes from 'prop-types';
import { IngredientsContext } from '../../../services/ingredients-context';

const IngredientList = ({ show }) => {
	const { ingredients } = useContext(IngredientsContext);
	const groupedIngredients = ingredients.reduce((acc, item) => {
		if (!acc[item.type]) acc[item.type] = [];
		acc[item.type].push(item);
		return acc;
	}, {});

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

	return (
		<div className={styles.wrapper}>
			{Object.keys(groupedIngredients).map((type) => (
				<div key={type}>
					<h2 className="text text_type_main-medium mt-10 mb-6">{getIngredientType(type)}</h2>
					<ul className={`${styles.list} pl-4`}>
						{groupedIngredients[type].map((ingredient) => (
							<IngredientItem key={ingredient._id} show={show} ingredient={ingredient} />
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

IngredientList.propTypes = {
	show: propTypes.func.isRequired,
};

export default IngredientList;
