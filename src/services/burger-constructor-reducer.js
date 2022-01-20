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

const REMOVE_BURGER_CONSTRUCTOR = "REMOVE_BURGER_CONSTRUCTOR";
const SET_BURGER_CONSTRUCTOR = "SET_BURGER_CONSTRUCTOR";
const SET_ORDER = "SET_ORDER";
const CLEAR_ORDER = "CLEAR_ORDER";

export function burgerConstructorReducer(state, { type, payload }) {
    switch (type) {
        case REMOVE_BURGER_CONSTRUCTOR:
            const cart = state.cart.filter(item => item.cart_id !== payload.cart_id);
            return { ...state, cart: cart, total: getTotal(cart) };
        case SET_BURGER_CONSTRUCTOR:
            return { ...state, cart: payload, total: getTotal(payload) };
        case SET_ORDER:
            return { ...state, cart: [], total: 0, order: payload };
        case CLEAR_ORDER:
            return { ...state, order: null }
        default:
            throw new Error(`Wrong type of action: ${type}`);
    }
}

export const removeBurgerConstructorAction = (payload) => ({ type: REMOVE_BURGER_CONSTRUCTOR, payload })
export const setBurgerConstructorAction = (payload) => ({ type: SET_BURGER_CONSTRUCTOR, payload })
export const setOrderAction = (payload) => ({ type: SET_ORDER, payload })
export const clearOrderAction = () => ({ type: CLEAR_ORDER })