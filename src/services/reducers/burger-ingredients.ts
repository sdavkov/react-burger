import { AnyAction } from 'redux';
import { IBurgerIngredientState } from '../../utils/ts-types';
import {
    CLEAR_CURRENT_BURGER_INGREDIENT,
    GET_BURGER_INGREDIENTS,
    GET_BURGER_INGREDIENTS_REQUEST_FIELED,
    GET_BURGER_INGREDIENTS_SUCCESS,
    SET_CURRENT_BURGER_INGREDIENT
} from "../constants/burger-ingredients";

const initialState: IBurgerIngredientState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsRequestFailed: false,
}

export const burgerIngredientsReducer: (state: IBurgerIngredientState, action: AnyAction) => IBurgerIngredientState = (state = initialState, action) => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS:
            return {
                ...state,
                burgerIngredientsRequest: true
            }
        case GET_BURGER_INGREDIENTS_SUCCESS:
            return {
                ...state,
                burgerIngredients: action.payload,
                burgerIngredientsRequest: false,
                burgerIngredientsRequestFailed: false,
            }
        case GET_BURGER_INGREDIENTS_REQUEST_FIELED:
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsRequestFailed: true,
            }
        case SET_CURRENT_BURGER_INGREDIENT: {
            return {
                ...state,
                currentBurgerIngredient: state.burgerIngredients.find((item) => item._id === action.payload),
            }
        }
        case CLEAR_CURRENT_BURGER_INGREDIENT:
            return {
                ...state,
                currentBurgerIngredient: undefined,
            }
        default:
            return state;
    }
}