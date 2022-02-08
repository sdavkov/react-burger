import {
    checkResponse,
    getForgotPasswordRequest,
    getLoginUserRequest,
    getLogoutUserRequest, getRefreshTokenRequest,
    getRegisterUserRequest, getResetPasswordRequest, getUpdateUserRequest, getUserRequest
} from "../api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../utils/constants";

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_REQUEST_SUCCESS = 'GET_AUTH_REQUEST_SUCCESS';
export const GET_AUTH_REQUEST_FIELD = 'GET_AUTH_REQUEST_FIELD';
export const LOGOUT_USER = 'LOGOUT_USER';

export function registerUser(form) {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getRegisterUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                    dispatch({type: SET_CURRENT_USER, payload: data})
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], {expires: 20})
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, {expires: 20})
                } else
                    return Promise.reject(new Error('Ошибка регистрации'));
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function loginUser(form) {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getLoginUserRequest(form)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                    dispatch({type: SET_CURRENT_USER, payload: data})
                    setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], {expires: 20 * 60})
                    setCookie(REFRESH_TOKEN_NAME, data.refreshToken, {expires: 1440 * 60})
                } else
                    return Promise.reject(new Error('Ошибка аутентификации'));
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function logoutUser() {
    return function (dispatch, getState) {
        dispatch({type: GET_AUTH_REQUEST});
        getLogoutUserRequest(getCookie(REFRESH_TOKEN_NAME))
            .then(checkResponse)
            .then(data => {
                dispatch({type: LOGOUT_USER})
                deleteCookie(ACCESS_TOKEN_NAME);
                deleteCookie(REFRESH_TOKEN_NAME);
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
            })
            .catch(() => {
                dispatch({type: GET_AUTH_REQUEST_FIELD})
            });
    }
}

export function getUser() {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getUserRequest(getCookie(ACCESS_TOKEN_NAME))
            .then(checkResponse)
            .then(data => {
                if (data.message === "jwt expired") {
                    throw new Error('Токен просрочен')
                }
                dispatch({type: SET_CURRENT_USER, payload: data});
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
            })
            .catch(() => {
                    if (getCookie(REFRESH_TOKEN_NAME)) {
                        getRefreshTokenRequest(getCookie(REFRESH_TOKEN_NAME))
                            .then(checkResponse)
                            .then(data => {
                                setCookie(ACCESS_TOKEN_NAME, data.accessToken.split('Bearer ')[1], {expires: 20 * 60})
                                setCookie(REFRESH_TOKEN_NAME, data.refreshToken, {expires: 1440 * 60})
                                getUserRequest(getCookie(ACCESS_TOKEN_NAME))
                                    .then(checkResponse)
                                    .then(data => {
                                        dispatch({type: SET_CURRENT_USER, payload: data});
                                        dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                                    })
                            })
                            .catch(() => {
                                dispatch({type: GET_AUTH_REQUEST_FIELD})
                            })
                    } else {
                        dispatch({type: GET_AUTH_REQUEST_FIELD})
                    }
                }
            )
    }
}

export function updateUser(form) {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getUpdateUserRequest(form, getCookie(ACCESS_TOKEN_NAME))
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                    dispatch({type: SET_CURRENT_USER, payload: data})
                } else
                    return Promise.reject(new Error('Ошибка при обновления данных пользователя'));
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function forgotPassword(form) {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getForgotPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function resetPassword(form) {
    return function (dispatch) {
        dispatch({type: GET_AUTH_REQUEST});
        getResetPasswordRequest(form)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}