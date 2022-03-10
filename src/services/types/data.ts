export type TUser = {
	name: string;
	email: string;
}

export type TOrder = {
	number: number;
}

export type TBurgerIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export type TCart = {
	id: string;
	burgerIngredient: TBurgerIngredient;
}