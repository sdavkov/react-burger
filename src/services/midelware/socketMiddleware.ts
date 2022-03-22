import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types';
import { IWSActions } from '../types/web-sockets';

export const socketMiddleware = (wsActions: IWSActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: AnyAction) => {
			const { dispatch } = store;
			const { type, payload } = action;

			const { wsInit, wsSendMessage, wsOpen, wsClose, wsError, wsMessage } = wsActions;

			if (type === wsInit) {
				console.log(type, wsInit)
				// объект класса WebSocket
				socket = new WebSocket(payload);
			}
			if (socket) {

				// функция, которая вызывается при открытии сокета
				socket.onopen = event => {
					dispatch(wsOpen());
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = event => {
					dispatch(wsError());
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = event => {
					dispatch(wsMessage(JSON.parse(event.data)));
				};
				// функция, которая вызывается при закрытии соединения
				socket.onclose = event => {
					dispatch(wsClose());
				};

				if (type === wsSendMessage) {
					socket.send(JSON.stringify(payload));
				}
			}

			next(action);
		};
	}) as Middleware;
}; 