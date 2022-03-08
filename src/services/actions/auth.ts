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
import { AppDispatch } from '../store';
import { getAuthAction, getAuthFailedAction, getAuthSuccessAction, logoutUserAction, setCurrentUserAction } from '../slices/auth';

export function registerUser(form: IRegisterForm) {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        getRegisterUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch(getAuthSuccessAction());
                    dispatch(setCurrentUserAction(data.data))
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 })
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 20 })
                } else
                    return Promise.reject(new Error('Ошибка регистрации'));
            })
            .catch((e) =>
                dispatch(getAuthFailedAction(e.message))
            );
    }
}

export function loginUser(form: ILoginForm) {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        getLoginUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch(getAuthSuccessAction());
                    dispatch(setCurrentUserAction(data.data))
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], { expires: 20 * 60 })
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, { expires: 1440 * 60 })
                } else
                    return Promise.reject(new Error('Ошибка аутентификации'));
            })
            .catch((e) =>
                dispatch(getAuthFailedAction(e.message))
            );
    }
}

export function logoutUser() {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        const refreshToken = getCookie(REFRESH_TOKEN_NAME);
        if (refreshToken) {
            getLogoutUserRequest(refreshToken)
                .then(checkResponse)
                .then(data => {
                    dispatch(logoutUserAction())
                    deleteCookie(ACCESS_TOKEN_NAME);
                    deleteCookie(REFRESH_TOKEN_NAME);
                    dispatch(getAuthSuccessAction());
                })
                .catch((e) => {
                    dispatch(getAuthFailedAction(e.message))
                });
        }
        else {
            dispatch(getAuthFailedAction('No refresh token!'))
        }
    }
}

export function getUser() {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        const access_tocken = getCookie(ACCESS_TOKEN_NAME);
        if (access_tocken) {
            getUserRequest(access_tocken)
                .then(checkResponse)
                .then(data => {
                    if (data.message === "jwt expired") {
                        throw new Error("jwt expired");
                    }
                    dispatch(setCurrentUserAction(data.data));
                    dispatch(getAuthSuccessAction());
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
                                        dispatch(setCurrentUserAction(data.data));
                                        dispatch(getAuthSuccessAction());
                                    })
                            })
                            .catch((e) => {
                                dispatch(getAuthFailedAction(e.message))
                            })
                    } else {
                        dispatch(getAuthFailedAction('No refresh tocken!'))
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
                                dispatch(setCurrentUserAction(data.data));
                                dispatch(getAuthSuccessAction());
                            })
                    })
                    .catch((e) => {
                        dispatch(getAuthFailedAction(e.message))
                    })
            } else {
                dispatch(getAuthFailedAction('No refresh tocken!'))
            }
        }
    }
}

export function updateUser(form: IUserProfileForm) {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        const access_tocken = getCookie(ACCESS_TOKEN_NAME);
        if (access_tocken) {
            getUpdateUserRequest(form, access_tocken)
                .then(checkResponse)
                .then(data => {
                    if (data.success) {
                        dispatch(setCurrentUserAction(data.data))
                        dispatch(getAuthSuccessAction());
                    } else
                        return Promise.reject(new Error('Ошибка при обновления данных пользователя'));
                })
                .catch((e) =>
                    dispatch(getAuthFailedAction(e.message))
                );
        }
        else {
            dispatch(getAuthFailedAction('No access tocken!'))
        }
    }
}

export function forgotPassword(form: IForgotPasswordForm) {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        getForgotPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch(getAuthSuccessAction());
            })
            .catch((e) =>
                dispatch(getAuthFailedAction(e.message))
            );
    }
}

export function resetPassword(form: IResetPasswordForm) {
    return function (dispatch: AppDispatch) {
        dispatch(getAuthAction());
        getResetPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch(getAuthSuccessAction());
            })
            .catch((e) =>
                dispatch(getAuthFailedAction(e.message))
            );
    }
}