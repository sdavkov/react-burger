import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICart } from '../../utils/ts-types'

export type TBurgerConstructorState = {
	cart: ICart[],
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
	cart: ICart[];
	total: number
}

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