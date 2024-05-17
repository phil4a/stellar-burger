export type TODO_ANY = any;

export interface IIngredientType {
	type: 'bun' | 'sauce' | 'main';
}
export interface IIngredient {
	_id: string;
	nanoid: string;
	name: string;
	image: string;
	image_mobile: string;
	type: IIngredientType;
	price: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	image_large: string;
	__v: number;
}

export interface IDraggedIngredient extends IIngredient {
	ingredient: IIngredient;
	index: number;
	id: string;
}
