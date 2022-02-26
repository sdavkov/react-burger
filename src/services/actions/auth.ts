import {
    checkResponse,
    getForgotPasswordRequest,
    getLoginUserRequest,
    getLogoutUserRequest, getRefreshTokenRequest,
    getRegisterUserRequest, getResetPasswordRequest, getUpdateUserRequest, getUserRequest
} from "../api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../utils/constants";
import { IForgotPasswordForm, ILoginForm, IRegisterForm, IResetPasswordForm, IUserProfileForm } from '../../utils/ts-types';
import { AppDispatch } from '../reducers';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_REQUEST_SUCCESS = 'GET_AUTH_REQUEST_SUCCESS';
export const GET_AUTH_REQUEST_FIELD = 'GET_AUTH_REQUEST_FIELD';
export const LOGOUT_USER = 'LOGOUT_USER';

export function registerUser(form: IRegisterForm) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        getRegisterUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                    dispatch({ type: SET_CURRENT_USER, payload: data })
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 })
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 20 })
                } else
                    return Promise.reject(new Error('Ошибка регистрации'));
            })
            .catch((e) => {
                dispatch({ type: GET_AUTH_REQUEST_FIELD, payload: e.message })
            }
            );
    }
}

export function loginUser(form: ILoginForm) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        getLoginUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                    dispatch({ type: SET_CURRENT_USER, payload: data })
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
                } else
                    return Promise.reject(new Error('Ошибка аутентификации'));
            })
            .catch((e) => {
                dispatch({ type: GET_AUTH_REQUEST_FIELD, payload: e.message })
            }
            );
    }
}

export function logoutUser() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        const refreshToken = getCookie(REFRESH_TOKEN_NAME);
        if (refreshToken) {
            getLogoutUserRequest(refreshToken)
                .then(checkResponse)
                .then(data => {
                    dispatch({ type: LOGOUT_USER })
                    deleteCookie(ACCESS_TOKEN_NAME);
                    deleteCookie(REFRESH_TOKEN_NAME);
                    dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                })
                .catch(() => {
                    dispatch({ type: GET_AUTH_REQUEST_FIELD })
                });
        }
        else {
            dispatch({ type: GET_AUTH_REQUEST_FIELD })
        }
    }
}

export function getUser() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        const access_tocken = getCookie(ACCESS_TOKEN_NAME);
        if (access_tocken) {
            getUserRequest(access_tocken)
                .then(checkResponse)
                .then(data => {
                    if (data.message === "jwt expired") {
                        dispatch({ type: GET_AUTH_REQUEST_FIELD })
                    }
                    dispatch({ type: SET_CURRENT_USER, payload: data });
                    dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                })
                .catch(() => {
                    const refreshToken = getCookie(REFRESH_TOKEN_NAME);
                    if (refreshToken) {
                        getRefreshTokenRequest(refreshToken)
                            .then(checkResponse)
                            .then(data => {
                                setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
                                setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
                                getUserRequest(data.accessToken.split('Bearer ')[1])
                                    .then(checkResponse)
                                    .then(data => {
                                        dispatch({ type: SET_CURRENT_USER, payload: data });
                                        dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                                    })
                            })
                            .catch(() => {
                                dispatch({ type: GET_AUTH_REQUEST_FIELD })
                            })
                    } else {
                        dispatch({ type: GET_AUTH_REQUEST_FIELD })
                    }
                }
                )
        }
        else {
            const refreshToken = getCookie(REFRESH_TOKEN_NAME);
            if (refreshToken) {
                getRefreshTokenRequest(refreshToken)
                    .then(checkResponse)
                    .then(data => {
                        setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
                        setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
                        getUserRequest(data.accessToken.split('Bearer ')[1])
                            .then(checkResponse)
                            .then(data => {
                                dispatch({ type: SET_CURRENT_USER, payload: data });
                                dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                            })
                    })
                    .catch(() => {
                        dispatch({ type: GET_AUTH_REQUEST_FIELD })
                    })
            } else {
                dispatch({ type: GET_AUTH_REQUEST_FIELD })
            }
        }
    }
}

export function updateUser(form: IUserProfileForm) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        const access_tocken = getCookie(ACCESS_TOKEN_NAME);
        if (access_tocken) {
            getUpdateUserRequest(form, access_tocken)
                .then(checkResponse)
                .then(data => {
                    if (data.success) {
                        dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
                        dispatch({ type: SET_CURRENT_USER, payload: data })
                    } else
                        return Promise.reject(new Error('Ошибка при обновления данных пользователя'));
                })
                .catch((e) => {
                    dispatch({ type: GET_AUTH_REQUEST_FIELD, payload: e.message })
                }
                );
        }
        else {
            dispatch({ type: GET_AUTH_REQUEST_FIELD })
        }
    }
}

export function forgotPassword(form: IForgotPasswordForm) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        getForgotPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
            })
            .catch((e) => {
                dispatch({ type: GET_AUTH_REQUEST_FIELD, payload: e.message })
            }
            );
    }
}

export function resetPassword(form: IResetPasswordForm) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_AUTH_REQUEST });
        getResetPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch({ type: GET_AUTH_REQUEST_SUCCESS });
            })
            .catch((e) => {
                dispatch({ type: GET_AUTH_REQUEST_FIELD, payload: e.message })
            }
            );
    }
}