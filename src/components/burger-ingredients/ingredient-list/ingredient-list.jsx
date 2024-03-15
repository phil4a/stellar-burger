import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientList = ({ ingredients }) => {
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
		<div style={{ height: '100%', overflowY: 'auto' }}>
			{Object.keys(groupedIngredients).map((type) => (
				<div key={type}>
					<h2 className="text text_type_main-medium mt-10 mb-6">{getIngredientType(type)}</h2>
					<ul
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							rowGap: '32px',
							columnGap: '24px',
						}}
						className="pl-4">
						{groupedIngredients[type].map((ingredient) => (
							<IngredientItem key={ingredient._id} {...ingredient} />
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default IngredientList;
