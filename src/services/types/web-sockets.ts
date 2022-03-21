import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type TOrderStatus = 'created' | 'done' | 'pending';

export type TOrder = {
	readonly ingredients: string[];
	readonly _id: string;
	readonly name: string;
	readonly status: TOrderStatus;
	readonly number: number;
	readonly createdAt: string;
	readonly updatedAt: string;
}

export type TWSResponse = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
}

export type TWSState = {
	wsConnected: boolean;
	wsRequest: boolean;
	wsError: boolean;
}

export interface IWSActions {
	wsInit: string;
	wsSendMessage: string;
	wsOpen: ActionCreatorWithoutPayload<string>
	wsClose: ActionCreatorWithoutPayload<string>;
	wsError: ActionCreatorWithoutPayload<string>;
	wsMessage: ActionCreatorWithPayload<TWSResponse, string>;
}