import { AnyAction } from 'redux';
import { IBurgerConstructorState } from '../../utils/ts-types';
import {
    CLEAR_CART,
    CLEAR_CURRENT_ORDER_NUMBER,
    GET_ORDER_REQUEST,
    GET_ORDER_REQUEST_FIELD,
    GET_ORDER_REQUEST_SUCCESS,
    SET_CART
} from "../actions/burger-constructor";

const initialState: IBurgerConstructorState = {
    cart: [],
    total: 0,
    currentOrderNumber: 0,
    orderRequest: false,
    orderRequestFailed: false,
}

export const burgerConstructorReducer: (state: IBurgerConstructorState | undefined, action: AnyAction) => IBurgerConstructorState = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: action.payload.cart,
                total: action.payload.total
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: [],
                total: 0,
            }
        case GET_ORDER_REQUEST: return {
            ...state,
            orderRequest: true,
            orderRequestFailed: false,
        }
        case GET_ORDER_REQUEST_FIELD: return {
            ...state,
            orderRequest: false,
            orderRequestFailed: true,
        }
        case GET_ORDER_REQUEST_SUCCESS: return {
            ...state,
            orderRequest: false,
            orderRequestFailed: false,
            currentOrderNumber: action.payload,
        }
        case CLEAR_CURRENT_ORDER_NUMBER:
            return {
                ...state,
                currentOrderNumber: 0,
            }
        default:
            return state;
    }
}