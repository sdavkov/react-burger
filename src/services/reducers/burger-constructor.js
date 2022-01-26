import {
    CLEAR_CART, CLEAR_CURRENT_ORDER_NUMBER, GET_ORDER_REQUEST, GET_ORDER_REQUEST_FIELD, GET_ORDER_REQUEST_SUCCESS,
    SET_CART
} from "../actions/burger-constructor";

const initialState = {
    cart: [],
    total: null,
    currentOrderNumber: null,
    orderRequest: false,
    orderRequestFailed: false,
}

export const burgerConstructorReducer = (state = initialState, action) => {
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
                total: null,
            }
        case GET_ORDER_REQUEST: return {
            ...state,
            orderRequest: false,
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
                currentOrderNumber: null,
            }
        default:
            return state;
    }
}