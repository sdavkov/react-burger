import { v4 as uuidv4 } from "uuid";
import { ACCESS_TOKEN_NAME, BURGER_INGREDIENT_BUN_TYPE } from "../../utils/constants";
import { checkResponse, getCreateOrderRequest } from "../api";
import { getCookie } from "../../utils/cookies";
import { AppDispatch, RootState } from '../reducers';
import { IBurgerIngredient, ICart } from '../../utils/ts-types';

export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_REQUEST_SUCCESS = 'GET_ORDER_REQUEST_SUCCESS';
export const GET_ORDER_REQUEST_FIELD = 'GET_ORDER_REQUEST_FIELD';
export const CLEAR_CURRENT_ORDER_NUMBER = 'CLEAR_CURRENT_ORDER';

const getTotal = (cart: ICart[]) => {
    const bun = cart.find((item) => item.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE);
    const additions = cart.filter(item => item.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
    let total = 0;
    if (bun) {
        total += bun.burgerIngredient.price * 2;
        total += additions.reduce((total, item) => total + item.burgerIngredient.price, 0);
    }
    return total;
}

export function moveCartItem(dragIndex: number, hoverIndex: number) {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        let cart = [...getState().burgerConstructor.cart];
        const bun = cart.find(cartItem => cartItem.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE);
        if (bun) {
            const additions = cart.filter(cartItem => cartItem.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
            const dragItem = additions.splice(dragIndex, 1)[0];
            additions.splice(hoverIndex, 0, dragItem);
            cart = [bun, ...additions];
        }
        dispatch({ type: SET_CART, payload: { cart, total: getTotal(cart) } });
    }
}

export function addCartItem(burgerIngredient: IBurgerIngredient) {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        let cart = [...getState().burgerConstructor.cart];
        if (burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE) {
            //удаляем другую булку, т.к. может быть только одна булка
            cart = cart.filter(item => item.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE);
        }
        if ((burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE && cart.find(item => item.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE)) || burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE) {
            //добавляем ингредиент, только если булка уже добавлена или добавляемый ингредиент и есть булка
            cart.push({ id: uuidv4(), burgerIngredient });
            dispatch({ type: SET_CART, payload: { cart, total: getTotal(cart) } });
        }
    }
}

export function removeCartItem(cartItem: ICart) {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        let cart = [...getState().burgerConstructor.cart].filter(item => item.id !== cartItem.id);
        dispatch({ type: SET_CART, payload: { cart, total: getTotal(cart) } });
    }
}

export function createOrder() {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        dispatch({ type: GET_ORDER_REQUEST });
        const access_tocken = getCookie(ACCESS_TOKEN_NAME);
        if (access_tocken) {
            getCreateOrderRequest(getState().burgerConstructor.cart, access_tocken)
                .then(checkResponse)
                .then(data => {
                    dispatch({ type: GET_ORDER_REQUEST_SUCCESS, payload: data.order.number });
                    dispatch({ type: CLEAR_CART });
                })
                .catch(() => dispatch({ type: GET_ORDER_REQUEST_FIELD }));
        }
        else {
            dispatch({ type: GET_ORDER_REQUEST_FIELD })
        }
    }
}

