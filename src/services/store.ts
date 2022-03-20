import { configureStore } from '@reduxjs/toolkit';
import { WSS_ALL_ORDERS_URL } from '../utils/constants';
import { socketAllOrdersMiddleware } from './midelware/socketAllOrdersMiddleware';
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
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketAllOrdersMiddleware(WSS_ALL_ORDERS_URL)),
	}
)