export enum IngredientType {
	BUN = 'bun',
	SAUCE = 'sauce',
	MAIN = 'main',
}
export interface IIngredient {
	_id: string;
	nanoid: string;
	name: string;
	image: string;
	image_mobile: string;
	type: IngredientType;
	price: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	image_large: string;
	__v: number;
	count: number;
}

export interface IDraggedIngredient extends IIngredient {
	ingredient: IIngredient;
	index: number;
	id: string;
}

export enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	SUCCESS = 'succeeded',
	ERROR = 'failed',
}
