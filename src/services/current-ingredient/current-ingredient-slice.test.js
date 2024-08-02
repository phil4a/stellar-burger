import reducer, { initialState, setCurrentIngredient } from './current-ingredient-slice';

const mockedIngredient = {
	_id: '1',
	name: 'test',
	type: 'test',
	proteins: 1,
	fat: 1,
	carbohydrates: 1,
	calories: 1,
	price: 1,
	image: 'test',
	image_mobile: 'test',
	image_large: 'test',
	__v: 1,
	count: 1,
};

describe('Check current ingredient', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	test('should set current ingredient', () => {
		expect(reducer(initialState, setCurrentIngredient(mockedIngredient))).toEqual({
			ingredient: mockedIngredient,
		});
	});
});
