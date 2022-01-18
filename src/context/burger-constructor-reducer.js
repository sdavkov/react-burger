import { v4 as uuidv4 } from 'uuid';

const getTotal = (cart) => {
    const bun = cart.find((item) => item.ingredient.type === 'bun');
    const additionals = cart.filter(item => item.ingredient.type !== 'bun');
    if (bun && additionals) {
        let total = bun.ingredient.price * 2;
        total += additionals.reduce((total, item) => total + item.ingredient.price, 0);
        return total;
    }
    return 0
}

export const initialBurgerConstructorState = { cart: [], total: 0, order: null };

const ADD_BURGER_CONSTRUCTOR = "ADD_BURGER_CONSTRUCTOR";
const REMOVE_BURGER_CONSTRUCTOR = "REMOVE_BURGER_CONSTRUCTOR";
const SET_BURGER_CONSTRUCTOR = "SET_BURGER_CONSTRUCTOR";
const CLEAR_BURGER_CONSTRUCTOR = "CLEAR_BURGER_CONSTRUCTOR";
const SET_ORDER = "SET_ORDER";

export function burgerConstructorReducer(state, { type, payload }) {
    switch (type) {
        case ADD_BURGER_CONSTRUCTOR:
            {
                const item = { cart_id: uuidv4(), ingredient: payload };
                const cart = [...state.cart, item];
                return { ...state, cart: cart, total: getTotal(cart) };
            }
        case REMOVE_BURGER_CONSTRUCTOR:
            {
                const cart = [state.cart.filter(item => item.cart_id !== payload.cart_id)];
                return { ...state, cart: cart, total: getTotal(cart) };
            }
        case SET_BURGER_CONSTRUCTOR:
            {
                const cart = payload.map(item => { return { cart_id: uuidv4(), ingredient: item } });
                return { ...state, cart: cart, total: getTotal(cart) };
            }
        case CLEAR_BURGER_CONSTRUCTOR:
            return initialBurgerConstructorState;
        case SET_ORDER:
            return { ...state, cart: [], total: 0, order: payload };
        default:
            throw new Error(`Wrong type of action: ${type}`);
    }
}

export const addBurgerConstructorAction = (payload) => ({ type: ADD_BURGER_CONSTRUCTOR, payload })
export const removeBurgerConstructorAction = (payload) => ({ type: REMOVE_BURGER_CONSTRUCTOR, payload })
export const setBurgerConstructorAction = (payload) => ({ type: SET_BURGER_CONSTRUCTOR, payload })
export const clearBurgerConstructorAction = () => ({ type: CLEAR_BURGER_CONSTRUCTOR })
export const setOrderAction = (payload) => ({type: SET_ORDER, payload})