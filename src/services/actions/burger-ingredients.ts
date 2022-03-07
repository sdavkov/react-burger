import { IBurgerIngredient } from '../../utils/ts-types';
import { checkResponse, getBurgerIngredientsRequest } from "../api";
import {
    GET_BURGER_INGREDIENTS,
    GET_BURGER_INGREDIENTS_FIELED,
    GET_BURGER_INGREDIENTS_SUCCESS,
    SET_CURRENT_BURGER_INGREDIENT,
    CLEAR_CURRENT_BURGER_INGREDIENT,
} from '../constants/burger-ingredients';
import { AppDispatch } from '../reducers';

export interface IGetBurgerIngredientsAction {
    readonly type: typeof GET_BURGER_INGREDIENTS;
}

export interface IGetBurgerIngredientsSuccessAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
    readonly burgerIngredients: IBurgerIngredient[];
}

export interface IGetBurgerIngredientsFailedAction {
    readonly type: typeof GET_BURGER_INGREDIENTS_FIELED;
}

export interface ISetCurrentBurgerIngredientAction {
    readonly type: typeof SET_CURRENT_BURGER_INGREDIENT;
    readonly burgerIngredient: IBurgerIngredient;
}

export interface IClearCurrentBurgerIngredientAction {
    readonly type: typeof CLEAR_CURRENT_BURGER_INGREDIENT;
}

export const GetBurgerIngredients = (): IGetBurgerIngredientsAction => ({
    type: GET_BURGER_INGREDIENTS,
})

export const GetBurgerIngredientsRequestSuccess = (burgerIngredients: IBurgerIngredient[]): IGetBurgerIngredientsSuccessAction => ({
    type: GET_BURGER_INGREDIENTS_SUCCESS,
    burgerIngredients,
})

export const GetBurgerIngredientsFailed = (): IGetBurgerIngredientsFailedAction => ({
    type: GET_BURGER_INGREDIENTS_FIELED,
})

export const SetCurrentBurgerIngredient = (burgerIngredient: IBurgerIngredient): ISetCurrentBurgerIngredientAction => ({
    type: SET_CURRENT_BURGER_INGREDIENT,
    burgerIngredient,
})

export const ClearCurrentBurgerIngredient = (): IClearCurrentBurgerIngredientAction => ({
    type: CLEAR_CURRENT_BURGER_INGREDIENT,
})

export type TBurgerIngredientsActions =
    | IGetBurgerIngredientsAction
    | IGetBurgerIngredientsSuccessAction
    | IGetBurgerIngredientsFailedAction
    | ISetCurrentBurgerIngredientAction
    | IClearCurrentBurgerIngredientAction;

export function getBurgerIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_BURGER_INGREDIENTS })
        getBurgerIngredientsRequest()
            .then(checkResponse)
            .then(data => dispatch({
                type: GET_BURGER_INGREDIENTS_SUCCESS,
                payload: data.data
            }))
            .catch(() => dispatch({ type: GET_BURGER_INGREDIENTS_FIELED }));
    }
}