interface BaseAction {
	type: string;
}

export interface IUser {
	name: string;
	email: string;
}

export interface IAuthState {
	currentUser: IUser | null;
	authRequest: boolean;
	authRequestFailed: boolean;
	authRequestFailedMessage: string;
}

export interface IAuthAction extends BaseAction {
	payload: {
		user: IUser;
		message: string;
	}
}

export interface IBurgerIngredient {
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

export interface IBurgerIngredientState {
	burgerIngredients: IBurgerIngredient[],
	currentBurgerIngredient: IBurgerIngredient | undefined,
	burgerIngredientsRequest: boolean,
	burgerIngredientsRequestFailed: boolean,
}

export interface IBurgerIngredientAction extends BaseAction {
	payload: {
		burgerIngredients: IBurgerIngredient[];
		_id: string;
	}
}

export interface ICart {
	id: string;
	burgerIngredient: IBurgerIngredient;
}

export interface IBurgerConstructorState {
	cart: ICart[],
	total: number,
	currentOrderNumber: number,
	orderRequest: boolean,
	orderRequestFailed: boolean,
}

export interface IBurgerConstructorAction extends BaseAction {
	payload: {
		total: number;
		cart: ICart[];
		orderNumber: 0;
	}
}

export interface IRootState {
	burgerConstructor: IBurgerConstructorState,
	burgerIngredients: IBurgerIngredientState,
	auth: IAuthState,
}