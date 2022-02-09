import {checkResponse, getBurgerIngredientsRequest} from "../api";

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_REQUEST_SUCCESS = 'GET_BURGER_INGREDIENTS_REQUEST_SUCCESS';
export const GET_BURGER_INGREDIENTS_REQUEST_FIELD = 'GET_BURGER_INGREDIENTS_REQUEST_FIELD';
export const SET_CURRENT_BURGER_INGREDIENT = 'SET_CURRENT_BURGER_INGREDIENT';
export const CLEAR_CURRENT_BURGER_INGREDIENT = 'CLEAR_CURRENT_BURGER_INGREDIENT';

export function getBurgerIngredients() {
    return function (dispatch) {
        dispatch({type: GET_BURGER_INGREDIENTS_REQUEST})
        getBurgerIngredientsRequest()
            .then(checkResponse)
            .then(data => dispatch({
                type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
                payload: data.data
            }))
            .catch(() => dispatch({type: GET_BURGER_INGREDIENTS_REQUEST_FIELD}));
    }
}