import { checkResponse, getBurgerIngredientsRequest } from "../api";
import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_REQUEST_FIELD,
    GET_BURGER_INGREDIENTS_REQUEST_SUCCESS
} from '../constants/burger-ingredients';
import { AppDispatch } from '../reducers';

export function getBurgerIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_BURGER_INGREDIENTS_REQUEST })
        getBurgerIngredientsRequest()
            .then(checkResponse)
            .then(data => dispatch({
                type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
                payload: data.data
            }))
            .catch(() => dispatch({ type: GET_BURGER_INGREDIENTS_REQUEST_FIELD }));
    }
}