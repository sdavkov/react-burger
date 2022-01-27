import {combineReducers} from "redux";
import {burgerConstructorReducer} from "./burger-constructor";
import {burgerIngredientsReducer} from "./burger-ingredients";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer
})