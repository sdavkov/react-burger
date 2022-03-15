import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { closedWSConnection, errorWSConnection, getWSMessage, successWSConnection } from '../slices/web-socket';
import { AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: AnyAction) => {
			const { dispatch } = store;
			const { type, payload } = action;
			if (type === 'webSocket/startWSConnection') {
				// объект класса WebSocket
				socket = new WebSocket(wsUrl);
			}
			if (socket) {

				// функция, которая вызывается при открытии сокета
				socket.onopen = event => {
					dispatch(successWSConnection());
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = event => {
					dispatch(errorWSConnection());
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = event => {
					const { data } = event;
					dispatch(getWSMessage(data));
				};
				// функция, которая вызывается при закрытии соединения
				socket.onclose = event => {
					dispatch(closedWSConnection());
				};
			}

			next(action);
		};
	}) as Middleware;
}; 