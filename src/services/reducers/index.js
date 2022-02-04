import {combineReducers} from "redux";
import {burgerConstructorReducer} from "./burger-constructor";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {authReducer} from "./auth";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    auth: authReducer,
})