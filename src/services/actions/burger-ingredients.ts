import { IBurgerIngredient } from '../../utils/ts-types';
import { checkResponse, getBurgerIngredientsRequest } from "../api";
import {
    GET_BURGER_INGREDIENTS_REQUEST,
    GET_BURGER_INGREDIENTS_REQUEST_FAILED,
    GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
    SET_CURRENT_BURGER_INGREDIENT,
    CLEAR_CURRENT_BURGER_INGREDIENT,
} from '../constants/burger-ingredients';
import { AppDispatch } from '../store';

export interface IGetBurgerIngredientsAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientsSuccessAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST_SUCCESS;
    readonly burgerIngredients: IBurgerIngredient[];
}

export interface IGetBurgerIngredientsFailedAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST_FAILED;
}

export interface ISetCurrentBurgerIngredientAction {
    readonly type: typeof SET_CURRENT_BURGER_INGREDIENT;
    readonly burgerIngredient: IBurgerIngredient;
}

export interface IClearCurrentBurgerIngredientAction {
    readonly type: typeof CLEAR_CURRENT_BURGER_INGREDIENT;
}

export const getBurgerIngredientsAction = (): IGetBurgerIngredientsAction => ({
    type: GET_BURGER_INGREDIENTS_REQUEST,
})

export const getBurgerIngredientsRequestSuccessAction = (burgerIngredients: IBurgerIngredient[]): IGetBurgerIngredientsSuccessAction => ({
    type: GET_BURGER_INGREDIENTS_REQUEST_SUCCESS,
    burgerIngredients,
})

export const getBurgerIngredientsFailedAction = (): IGetBurgerIngredientsFailedAction => ({
    type: GET_BURGER_INGREDIENTS_REQUEST_FAILED,
})

export const setCurrentBurgerIngredientAction = (burgerIngredient: IBurgerIngredient): ISetCurrentBurgerIngredientAction => ({
    type: SET_CURRENT_BURGER_INGREDIENT,
    burgerIngredient,
})

export const clearCurrentBurgerIngredientAction = (): IClearCurrentBurgerIngredientAction => ({
    type: CLEAR_CURRENT_BURGER_INGREDIENT,
})

export type TBurgerIngredientsActions =
    | IGetBurgerIngredientsAction
    | IGetBurgerIngredientsSuccessAction
    | IGetBurgerIngredientsFailedAction
    | ISetCurrentBurgerIngredientAction
    | IClearCurrentBurgerIngredientAction;

export const getBurgerIngredients = () => (dispatch: AppDispatch) => {
    dispatch(getBurgerIngredientsAction())
    getBurgerIngredientsRequest()
        .then(checkResponse)
        .then(data => dispatch(getBurgerIngredientsRequestSuccessAction(data.data)))
        .catch(() => dispatch(getBurgerIngredientsFailedAction()));
}