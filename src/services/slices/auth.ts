import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../utils/constants';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import { getForgotPasswordRequest, getLoginUserRequest, getRefreshTokenRequest, getRegisterUserRequest, getResetPasswordRequest, getUpdateUserRequest, getUserRequest } from '../api';
import { TUser } from '../types/data';
import { IRegisterForm } from '../../pages/register/register';
import { IResetPasswordForm } from '../../pages/reset-password/reset-password';
import { ILoginForm } from '../../pages/login/login';
import { IUserProfileForm } from '../../components/user-profile/user-profile';
import { IForgotPasswordForm } from '../../pages/forgot-password/forgot-password';

export type TAuthState = {
	currentUser?: TUser;
	authRequest: boolean;
	authRequestFailed: boolean;
	authRequestFailedMessage?: string;
}

const initialState: TAuthState = {
	authRequest: false,
	authRequestFailed: false,
	authRequestFailedMessage: '',
}

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (form: IRegisterForm) => {
		const result = await getRegisterUserRequest(form);
		setCookie(ACCESS_TOKEN_NAME, result.accessToken.split('Bearer ')[1], { expires: 20 })
		setCookie(REFRESH_TOKEN_NAME, result.refreshToken, { expires: 20 })
		return result;
	}
)

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (form: ILoginForm) => {
		const result = await getLoginUserRequest(form);
		setCookie(ACCESS_TOKEN_NAME, result.accessToken.split('Bearer ')[1], { expires: 20 })
		setCookie(REFRESH_TOKEN_NAME, result.refreshToken, { expires: 20 })
		return result;
	}
)

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	() => {
		deleteCookie(ACCESS_TOKEN_NAME);
		deleteCookie(REFRESH_TOKEN_NAME);
	}
)

export const getUser = createAsyncThunk(
	'auth/getUser',
	() => {
		const access_tocken = getCookie(ACCESS_TOKEN_NAME);
		if (access_tocken) {
			return getUserRequest(access_tocken).catch(() => {
				const refreshToken = getCookie(REFRESH_TOKEN_NAME);
				if (refreshToken) {
					return getRefreshTokenRequest(refreshToken).then(data => {
						setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
						setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
						return getUserRequest(data.accessToken.split('Bearer ')[1])
					})
				}
				else {
					return Promise.reject(new Error("jwt expired"));
				}
			})
		}
		else {
			const refreshToken = getCookie(REFRESH_TOKEN_NAME);
			if (refreshToken) {
				return getRefreshTokenRequest(refreshToken).then(data => {
					setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
					setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
					return getUserRequest(data.accessToken.split('Bearer ')[1])
				})
			}
		}
	}
)

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	(form: IUserProfileForm) => {
		const access_tocken = getCookie(ACCESS_TOKEN_NAME);
		if (access_tocken) {
			return getUpdateUserRequest(form, access_tocken)
		}
		else {
			return Promise.reject(new Error("jwt expired"));
		}
	}
)

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	(form: IForgotPasswordForm) => {
		return getForgotPasswordRequest(form);
	}
)

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	(form: IResetPasswordForm) => {
		return getResetPasswordRequest(form);
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
			state.currentUser = action.payload.user;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(loginUser.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
			state.currentUser = action.payload.user;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(logoutUser.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.currentUser = undefined;
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(logoutUser.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(getUser.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
			if (action.payload) {
				state.currentUser = action.payload.user;
			}
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(updateUser.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
			state.currentUser = action.payload.data;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(forgotPassword.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(forgotPassword.fulfilled, (state) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(forgotPassword.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});

		builder.addCase(resetPassword.pending, (state) => {
			state.authRequest = true;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(resetPassword.fulfilled, (state) => {
			state.authRequest = false;
			state.authRequestFailed = false;
			state.authRequestFailedMessage = '';
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.authRequest = false;
			state.authRequestFailed = true;
			state.authRequestFailedMessage = action.error.message;
		});
	}
})

export default authSlice.reducer;