import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../utils/ts-types';

export type TAuthState = {
	currentUser?: IUser;
	authRequest: boolean;
	authRequestFailed: boolean;
	authRequestFailedMessage: string;
}

const initialState: TAuthState = {
	authRequest: false,
	authRequestFailed: false,
	authRequestFailedMessage: '',
}


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuthAction: (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		},
		getAuthSuccessAction: (state) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		},
		getAuthFailedAction: (state, action: PayloadAction<string>) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.payload;
		},
		setCurrentUserAction: (state, action: PayloadAction<IUser>) => {
			state.currentUser = action.payload;
		},
		logoutUserAction: (state) => {
			state.currentUser = undefined;
		},
	},
})

export const {
	getAuthAction,
	getAuthSuccessAction,
	getAuthFailedAction,
	setCurrentUserAction,
	logoutUserAction
} = authSlice.actions

export default authSlice.reducer