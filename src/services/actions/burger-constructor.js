import {v4 as uuidv4} from "uuid";
import {API_URL} from "../../utils/constants";

export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_REQUEST_SUCCESS = 'GET_ORDER_REQUEST_SUCCESS';
export const GET_ORDER_REQUEST_FIELD = 'GET_ORDER_REQUEST_FIELD';
export const CLEAR_CURRENT_ORDER_NUMBER = 'CLEAR_CURRENT_ORDER';

const getTotal = (cart) => {
    const bun = cart.find((item) => item.burgerIngredient.type === 'bun');
    const additions = cart.filter(item => item.burgerIngredient.type !== 'bun');
    let total = bun.burgerIngredient.price * 2;
    total += additions.reduce((total, item) => total + item.burgerIngredient.price, 0);
    return total;
}

export function addCartItem(burgerIngredient) {
    return function (dispatch, getState) {
        let cart = [...getState().burgerConstructor.cart];
        if (burgerIngredient.type === 'bun') {
            //удаляем другую булку, т.к. может быть только одна булка
            cart = cart.filter(item => item.burgerIngredient.type !== 'bun');
        }
        if ((burgerIngredient.type !== 'bun' && cart.find(item => item.burgerIngredient.type === 'bun')) || burgerIngredient.type === 'bun') {
            //добавляем ингредиент, только если булка уже добавлена или добавляемый ингредиент и есть булка
            cart.push({id: uuidv4(), burgerIngredient});
            dispatch({type: SET_CART, payload: {cart, total: getTotal(cart)}});
        }
    }
}

export function removeCartItem(burgerIngredient) {
    return function (dispatch, getState) {
        let cart = [...getState().burgerConstructor.cart].filter(item => item.id !== burgerIngredient.id);
        dispatch({type: SET_CART, payload: {cart, total: getTotal(cart)}});
    }
}

export function createOrder() {
    return function (dispatch, getState) {
        dispatch({type: GET_ORDER_REQUEST});
        fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ingredients: getState().burgerConstructor.cart.map(item => item.burgerIngredient._id)})
        }).then(res => {
            if (res && res.ok) {
                res.json().then(data => {
                    dispatch({type: GET_ORDER_REQUEST_SUCCESS, payload: data.order.number});
                    dispatch({type: CLEAR_CART});
                })
            } else
                dispatch({type: GET_ORDER_REQUEST_FIELD});
        })
    }
}

