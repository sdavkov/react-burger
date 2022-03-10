import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_NAME, BURGER_INGREDIENT_BUN_TYPE } from '../../utils/constants'
import { RootState } from '../types'
import { getCookie } from '../../utils/cookies';
import { getCreateOrderRequest } from '../api';
import { TBurgerIngredient, TCart, TOrder } from '../types/data';

export type TBurgerConstructorState = {
	cart: TCart[],
	total: number,
	currentOrderNumber: number,
	orderRequest: boolean,
	orderRequestFailed: boolean,
}

const initialState: TBurgerConstructorState = {
	cart: [],
	total: 0,
	currentOrderNumber: 0,
	orderRequest: false,
	orderRequestFailed: false,
}

export type TSetCartAction = {
	cart: TCart[];
	total: number
}

const getTotal = (cart: TCart[]) => {
	const bun = cart.find((item) => item.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE);
	const additions = cart.filter(item => item.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
	let total = 0;
	if (bun) {
		total += bun.burgerIngredient.price * 2;
		total += additions.reduce((total, item) => total + item.burgerIngredient.price, 0);
	}
	return total;
}

export const moveCartItem = createAsyncThunk<{ cart: TCart[], total: number }, { dragIndex: number, hoverIndex: number }, { state: RootState }>(
	'burgerConstructor/moveCartItem',
	(params, thunkAPI) => {
		let cart = [...thunkAPI.getState().burgerConstructor.cart];
		const bun = cart.find(cartItem => cartItem.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE);
		if (bun) {
			const additions = cart.filter(cartItem => cartItem.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
			const dragItem = additions.splice(params.dragIndex, 1)[0];
			additions.splice(params.hoverIndex, 0, dragItem);
			cart = [bun, ...additions];
		}
		const total = getTotal(cart);
		return { cart, total };
	}
)

export const createOrder = createAsyncThunk<{ name: string; order: TOrder; success: boolean } | undefined, undefined, { state: RootState }>(
	'burgerConstructor/createOrder',
	(_, thunkAPI) => {
		const access_tocken = getCookie(ACCESS_TOKEN_NAME);
		if (access_tocken) {
			return getCreateOrderRequest(thunkAPI.getState().burgerConstructor.cart, access_tocken);
		}
		else {
			throw new Error('No access token!');
		}
	}
)

export const addCartItem = createAsyncThunk<{ cart: TCart[], total: number } | undefined, TBurgerIngredient, { state: RootState }>(
	'burgerConstructor/addCartItem',
	(burgerIngredient, thunkAPI) => {
		let cart = [...thunkAPI.getState().burgerConstructor.cart];
		if (burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE) {
			//удаляем другую булку, т.к. может быть только одна булка
			cart = cart.filter(item => item.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
		}
		if ((burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE && cart.find(item => item.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE)) || burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE) {
			//добавляем ингредиент, только если булка уже добавлена или добавляемый ингредиент и есть булка
			cart.push({ id: uuidv4(), burgerIngredient });
			return {
				cart, total: getTotal(cart)
			}
		}
	}
)

export const removeCartItem = createAsyncThunk<{ cart: TCart[], total: number } | undefined, TCart, { state: RootState }>(
	'burgerConstructor/removeCartItem',
	(cartItem, thunkAPI) => {
		let cart = thunkAPI.getState().burgerConstructor.cart.filter(item => item.id !== cartItem.id);
		return { cart, total: getTotal(cart) };
	}
)

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setCartAction: (state, action: PayloadAction<TSetCartAction>) => {
			state.cart = action.payload.cart;
			state.total = action.payload.total;
		},
		clearCartAction: (state) => {
			state.cart = [];
			state.total = 0;
		},
		getOrderAction: (state) => {
			state.orderRequest = true;
			state.orderRequestFailed = false;
		},
		getOrderFailedAction: (state) => {
			state.orderRequest = false;
			state.orderRequestFailed = true;
		},
		getOrderSuccessAction: (state, action: PayloadAction<number>) => {
			state.orderRequest = false;
			state.orderRequestFailed = false;
			state.currentOrderNumber = action.payload;
		},
		clearCurrentOrderNumberAction: (state) => {
			state.currentOrderNumber = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(moveCartItem.fulfilled, (state, action) => {
			state.cart = action.payload.cart;
			state.total = action.payload.total;
		});
		builder.addCase(addCartItem.fulfilled, (state, action) => {
			if (action.payload) {
				state.cart = action.payload.cart;
				state.total = action.payload.total;
			}
		});
		builder.addCase(removeCartItem.fulfilled, (state, action) => {
			if (action.payload) {
				state.cart = action.payload.cart;
				state.total = action.payload.total;
			}
		});

		builder.addCase(createOrder.pending, (state) => {
			state.orderRequest = true;
			state.orderRequestFailed = false;
		});
		builder.addCase(createOrder.fulfilled, (state, action) => {
			if (action.payload?.order) {
				state.currentOrderNumber = action.payload.order.number;
				state.orderRequest = false;
				state.orderRequestFailed = false;
			}
		});
		builder.addCase(createOrder.rejected, (state) => {
			state.orderRequest = false;
			state.orderRequestFailed = true;
		});
	}
})

export const {
	setCartAction,
	clearCartAction,
	getOrderAction,
	getOrderFailedAction,
	getOrderSuccessAction,
	clearCurrentOrderNumberAction
} = burgerConstructorSlice.actions

export default burgerConstructorSlice.reducer