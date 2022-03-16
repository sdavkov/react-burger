import { createSlice } from '@reduxjs/toolkit';

export type TOrder = {
	readonly ingredients: string[];
	readonly _id: string;
	readonly name: string;
	readonly status: string;
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

const initialState: TWSState & TWSResponse = {
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
		getWSMessage: (state, action) => {
			const res = action.payload as TWSResponse;
			state.success = res.success;
			state.orders = res.orders;
			state.total = res.total;
			state.totalToday = res.totalToday;
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