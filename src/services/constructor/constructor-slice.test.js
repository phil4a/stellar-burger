import reducer, {
	initialState,
	setBun,
	addIngredient,
	moveIngredients,
	deleteIngredient,
	clearIngredients,
} from './constructor-slice';

// Мок для nanoid
jest.mock('@reduxjs/toolkit', () => {
	const originalModule = jest.requireActual('@reduxjs/toolkit');
	return {
		...originalModule,
		nanoid: jest.fn(() => 'fixed-nanoid'),
	};
});

const mockedBun = {
	_id: '1',
	name: 'bun',
	type: 'bun',
	proteins: 1,
	fat: 1,
	carbohydrates: 1,
	calories: 1,
	price: 1,
	image: 'bun',
	image_mobile: 'bun',
	image_large: 'bun',
	__v: 1,
	count: 1,
};

const ingredient1 = {
	_id: '2',
	name: 'test ingredient 1',
	type: 'main',
	proteins: 1,
	fat: 0.2,
	carbohydrates: 3.9,
	calories: 18,
	price: 5,
	image: 'ingredient.png',
	image_mobile: 'ingredient-mobile.png',
	image_large: 'ingredient-large.png',
	__v: 0,
	nanoid: 'fixed-nanoid',
};

const ingredient2 = {
	_id: '3',
	name: 'test ingredient 2',
	type: 'main',
	proteins: 1,
	fat: 0.2,
	carbohydrates: 3.9,
	calories: 18,
	price: 5,
	image: 'ingredient.png',
	image_mobile: 'ingredient-mobile.png',
	image_large: 'ingredient-large.png',
	__v: 0,
	nanoid: 'fixed-nanoid-2',
};

const initialStateWithIngredients = {
	...initialState,
	ingredients: [ingredient1, ingredient2],
};

describe('Check burger constructor', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	test('should set bun', () => {
		const expectedState = { ...initialState, bun: mockedBun };
		expect(reducer(initialState, setBun(mockedBun))).toEqual(expectedState);
	});

	test('should add ingredient', () => {
		const expectedState = {
			...initialState,
			ingredients: [ingredient1],
		};

		expect(reducer(initialState, addIngredient(ingredient1))).toEqual(expectedState);
	});

	test('should move ingredients', () => {
		const expectedState = {
			...initialState,
			ingredients: [ingredient2, ingredient1],
		};

		expect(
			reducer(initialStateWithIngredients, moveIngredients({ dragIndex: 0, hoverIndex: 1 })),
		).toEqual(expectedState);
	});

	test('should delete ingredient', () => {
		const expectedState = {
			...initialState,
			ingredients: [ingredient1],
		};
		expect(reducer(initialStateWithIngredients, deleteIngredient('fixed-nanoid-2'))).toEqual(
			expectedState,
		);
	});

	test('should clear ingredients', () => {
		const initialStateWithIngredientsAndBun = {
			...initialStateWithIngredients,
			bun: mockedBun,
		};
		expect(reducer(initialStateWithIngredientsAndBun, clearIngredients())).toEqual(initialState);
	});

	//Additional tests
	test('should handle adding ingredient with a different nanoid', () => {
		const newIngredient = {
			...ingredient1,
			nanoid: 'another-fixed-nanoid',
		};
		const expectedState = {
			...initialState,
			ingredients: [newIngredient],
		};

		expect(reducer(initialState, addIngredient(newIngredient))).toEqual(expectedState);
	});
});

test('should handle sequential add and delete', () => {
	let state = reducer(initialState, addIngredient(ingredient1));
	state = reducer(state, addIngredient(ingredient2));
	const expectedStateAfterDelete = {
		...initialState,
		ingredients: [ingredient1],
	};
	expect(reducer(state, deleteIngredient('fixed-nanoid-2'))).toEqual(expectedStateAfterDelete);
});

test('should handle empty state after deleting the last ingredient', () => {
	const stateWithOneIngredient = {
		...initialState,
		ingredients: [ingredient1],
	};
	const expectedState = {
		...initialState,
		ingredients: [],
	};
	expect(reducer(stateWithOneIngredient, deleteIngredient('fixed-nanoid'))).toEqual(expectedState);
});
