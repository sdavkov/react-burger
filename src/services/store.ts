import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { socketMiddleware } from './midelware/socketMiddleware';
import authReducer from './slices/auth';
import burgerConstructorReducer from './slices/burger-constructor';
import burgerIngredientsReducer from './slices/burger-ingredients';
import webSocketReducer, { webSocketSlice } from './slices/web-socket';
import { AppDispatch, RootState } from './types';
import { IWSActions } from './types/web-sockets';

const wsAllOrdersActions: IWSActions = {
	wsInit: 'webSocket/startWSConnection',
	wsSendMessage: 'webSocket/sendMessage',
	wsOpen: webSocketSlice.actions.successWSConnection,
	wsClose: webSocketSlice.actions.closedWSConnection,
	wsError: webSocketSlice.actions.errorWSConnection,
	wsMessage: webSocketSlice.actions.getWSMessage
};

export const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			burgerConstructor: burgerConstructorReducer,
			burgerIngredients: burgerIngredientsReducer,
			webSocket: webSocketReducer,
		},

		middleware: (getDefaultMiddleware) => getDefaultMiddleware()
			.concat(socketMiddleware(wsAllOrdersActions))
	}
)

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector