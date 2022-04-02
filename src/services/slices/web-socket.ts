import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWSResponse, TWSState } from '../types/web-sockets';

export const initialState: TWSState & TWSResponse = {
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
		startWSConnection: (state, action: PayloadAction<string>) => {
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
		getWSMessage: (state, action: PayloadAction<TWSResponse>) => {
			state.success = action.payload.success;
			state.orders = action.payload.orders;
			state.total = action.payload.total;
			state.totalToday = action.payload.totalToday;
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