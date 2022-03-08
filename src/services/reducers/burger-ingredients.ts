import { IBurgerIngredient } from '../../utils/ts-types';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import {
    CLEAR_CURRENT_BURGER_INGREDIENT,
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_REQUEST_FAILED,
    GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
    SET_CURRENT_BURGER_INGREDIENT
} from "../constants/burger-ingredients";

export type TBurgerIngredientState = {
    burgerIngredients: IBurgerIngredient[],
    currentBurgerIngredient?: IBurgerIngredient,
    burgerIngredientsRequest: boolean,
    burgerIngredientsRequestFailed: boolean,
}

const initialState: TBurgerIngredientState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsRequestFailed: false,
}

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientState => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS_REQUEST:
            return {
                ...state,
                burgerIngredientsRequest: true
            }
        case GET_BURGER_INGREDIENTS_REQUEST_SUCCESS:
            return {
                ...state,
                burgerIngredients: action.burgerIngredients,
                burgerIngredientsRequest: false,
                burgerIngredientsRequestFailed: false,
            }
        case GET_BURGER_INGREDIENTS_REQUEST_FAILED:
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsRequestFailed: true,
            }
        case SET_CURRENT_BURGER_INGREDIENT: {
            return {
                ...state,
                currentBurgerIngredient: state.burgerIngredients.find((item) => item._id === action.burgerIngredient._id),
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