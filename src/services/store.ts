import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import burgerConstructorReducer from './slices/burger-constructor';
import { burgerIngredientsReducer } from './reducers/burger-ingredients';

export const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			burgerConstructor: burgerConstructorReducer,
			burgerIngredients: burgerIngredientsReducer,
		}
	}
)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>