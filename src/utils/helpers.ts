import { useAppSelector } from '../services/store';
import { IIngredient } from '../utils/types';

// Все ингредиенты
export const useAllIngredients = (): IIngredient[] => {
	return useAppSelector((state) => state.ingredients.ingredients);
};

// Функция для получения ингредиентов по массиву идентификаторов
export const getIngredientsByIds = (
	allIngredients: IIngredient[],
	ids: string[],
): (IIngredient | undefined)[] => {
	return ids.map((id) => allIngredients.find((ingredient) => ingredient._id === id));
};

//Функция для расчета общей суммы заказа
export const calculateTotalPrice = (ingredients: (IIngredient | undefined)[]): number => {
	return ingredients.reduce((sum, ingredient) => sum + (ingredient ? ingredient.price : 0), 0);
};
