import { createSlice } from '@reduxjs/toolkit';

export type TOrder = {
	readonly ingredients: string[];
	readonly _id: string;
	readonly status: string;
	readonly number: number;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export type TWSState = {
	wsConnected: boolean;
	wsRequest: boolean;
	wsError: boolean;
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
}

const initialState: TWSState = {
	wsConnected: false,
	wsRequest: false,
	wsError: false,
	success: false,
	orders: [],
	total: 0,
	totalToday: 0
};

export const webSocketSlice = createSlice({
	name: 'webSocket',
	initialState,
	reducers: {
		startWSConnection: (state) => {
			state.wsRequest = true;
			state.wsError = false;
			state.wsConnected = false;
		},
		successWSConnection: (state) => {
			state.wsRequest = false;
			state.wsConnected = true;
			state.wsError = false;
		},
		errorWSConnection: (state) => {
			state.wsRequest = false;
			state.wsConnected = false;
			state.wsError = true;
		},
		closedWSConnection: (state) => {
			state.wsConnected = false;
		},
		getWSMessage: (state, payload) => {
			console.log(payload);
		}
	}
});

export const {
	startWSConnection,
	successWSConnection,
	errorWSConnection,
	closedWSConnection,
	getWSMessage,
} = webSocketSlice.actions

export default webSocketSlice.reducer;