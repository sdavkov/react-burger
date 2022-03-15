import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './midelware/socketMiddleware';
import authReducer from './slices/auth';
import burgerConstructorReducer from './slices/burger-constructor';
import burgerIngredientsReducer from './slices/burger-ingredients';
import webSocketReducer from './slices/web-socket';

export const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			burgerConstructor: burgerConstructorReducer,
			burgerIngredients: burgerIngredientsReducer,
			webSocket: webSocketReducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all')),
	}
)