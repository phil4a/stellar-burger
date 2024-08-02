import { count } from 'console';
import reducer, {
	initialState,
	increaseIngredientsCounter,
	decreaseIngredientsCounter,
	resetCounters,
	getIngredientsFromServer,
} from './ingredients-slice';
import ingredientsSlice from './ingredients-slice';

const createIngredient = (overrides = {}) => ({
	_id: '1',
	name: 'ingredient',
	type: 'main',
	proteins: 1,
	fat: 1,
	carbohydrates: 1,
	calories: 1,
	price: 1,
	image: 'test',
	image_mobile: 'test',
	image_large: 'test',
	__v: 1,
	count: 0,
	...overrides,
});

const mockedIngredient = createIngredient();
const mockedBun = createIngredient({ _id: '2', name: 'bun-1', type: 'bun' });
const mockedBun2 = createIngredient({ _id: '4', name: 'bun-2', type: 'bun' });
const mockedSauce = createIngredient({ _id: '3', name: 'sauce', type: 'sauce' });

const mockedIngredientsArray = {
	...initialState,
	ingredients: [mockedBun, mockedIngredient, mockedSauce, mockedBun2],
};

describe('Check ingredients', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	test('should increase ingredients counter for main type', () => {
		expect(reducer(mockedIngredientsArray, increaseIngredientsCounter(mockedIngredient))).toEqual({
			...mockedIngredientsArray,
			ingredients: [
				{ ...mockedBun, count: 0 },
				{ ...mockedIngredient, count: 1 },
				{ ...mockedSauce, count: 0 },
				{ ...mockedBun2, count: 0 },
			],
		});
	});

	test('should increase ingredients counter for first bun', () => {
		const state = reducer(mockedIngredientsArray, increaseIngredientsCounter(mockedBun));
		expect(state.ingredients).toEqual([
			{ ...mockedBun, count: 2 },
			{ ...mockedIngredient, count: 0 },
			{ ...mockedSauce, count: 0 },
			{ ...mockedBun2, count: 0 },
		]);
	});

	test('should increase ingredients counter for second bun', () => {
		const state = reducer(mockedIngredientsArray, increaseIngredientsCounter(mockedBun2));
		expect(state.ingredients).toEqual([
			{ ...mockedBun, count: 0 },
			{ ...mockedIngredient, count: 0 },
			{ ...mockedSauce, count: 0 },
			{ ...mockedBun2, count: 2 },
		]);
	});

	test('shound increase ingredients counter for sauce', () => {
		expect(reducer(mockedIngredientsArray, increaseIngredientsCounter(mockedSauce))).toEqual({
			...mockedIngredientsArray,
			ingredients: [
				{ ...mockedBun, count: 0 },
				{ ...mockedIngredient, count: 0 },
				{ ...mockedSauce, count: 1 },
				{ ...mockedBun2, count: 0 },
			],
		});
	});

	test('should decrease ingredients counter for main type', () => {
		const stateWithIncreasedIngredient = {
			...mockedIngredientsArray,
			ingredients: [mockedBun, { ...mockedIngredient, count: 4 }, mockedSauce, mockedBun2],
		};
		expect(
			reducer(stateWithIncreasedIngredient, decreaseIngredientsCounter(mockedIngredient)),
		).toEqual({
			...mockedIngredientsArray,
			ingredients: [
				{ ...mockedBun, count: 0 },
				{ ...mockedIngredient, count: 3 },
				{ ...mockedSauce, count: 0 },
				{ ...mockedBun2, count: 0 },
			],
		});
	});

	test('should decrease ingredients counter for sauce', () => {
		const stateWithIncreasedIngredient = {
			...mockedIngredientsArray,
			ingredients: [mockedBun, mockedIngredient, { ...mockedSauce, count: 5 }, mockedBun2],
		};
		expect(reducer(stateWithIncreasedIngredient, decreaseIngredientsCounter(mockedSauce))).toEqual({
			...mockedIngredientsArray,
			ingredients: [
				{ ...mockedBun, count: 0 },
				mockedIngredient,
				{ ...mockedSauce, count: 4 },
				{ ...mockedBun2, count: 0 },
			],
		});
	});

	test('should reset counters', () => {
		const increasedIngredientsArray = {
			...mockedIngredientsArray,
			ingredients: [
				{ ...mockedBun, count: 2 },
				{ ...mockedIngredient, count: 3 },
				{ ...mockedSauce, count: 4 },
				{ ...mockedBun2, count: 0 },
			],
		};

		expect(reducer(increasedIngredientsArray, resetCounters())).toEqual({
			...mockedIngredientsArray,
		});
	});
});

describe('async actions for ingredients', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should get pending state from server', async () => {
		const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
			json: jest.fn().mockResolvedValue({ data: [] }),
			ok: true,
		});

		const thunk = getIngredientsFromServer();
		const dispatch = jest.fn();
		const getState = jest.fn();

		await thunk(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'ingredients/fetch/pending',
			}),
		);

		mockFetch.mockRestore();
	});

	test('should get ingredients from server', async () => {
		const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
			json: jest.fn().mockResolvedValue({ data: mockedIngredientsArray.ingredients }),
			ok: true,
		});

		const thunk = getIngredientsFromServer();
		const dispatch = jest.fn();
		const getState = jest.fn();

		await thunk(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'ingredients/fetch/fulfilled',
				payload: { data: mockedIngredientsArray.ingredients },
			}),
		);

		expect(
			reducer(initialState, {
				type: 'ingredients/fetch/fulfilled',
				payload: { data: mockedIngredientsArray.ingredients },
			}),
		).toEqual({
			...initialState,
			status: 'succeeded',
			ingredients: mockedIngredientsArray.ingredients.map((ingredient) => ({
				...ingredient,
				count: ingredient.count || 0,
			})),
		});

		mockFetch.mockRestore();
	});

	test('should handle rejected state for getIngredientsFromServer', async () => {
		const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));

		const thunk = getIngredientsFromServer();
		const dispatch = jest.fn();
		const getState = jest.fn();

		await thunk(dispatch, getState, {});

		expect(dispatch).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'ingredients/fetch/rejected',
				error: expect.objectContaining({
					message: 'Network Error',
				}),
			}),
		);

		mockFetch.mockRestore();
	});
});
