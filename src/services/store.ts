import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import burgerConstructorReducer from './slices/burger-constructor';
import burgerIngredientsReducer from './slices/burger-ingredients';

export const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			burgerConstructor: burgerConstructorReducer,
			burgerIngredients: burgerIngredientsReducer,
		}
	}
)