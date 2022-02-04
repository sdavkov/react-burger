import {
    checkResponse,
    getForgotPasswordRequest,
    getLoginUserRequest,
    getLogoutUserRequest,
    getRegisterUserRequest, getResetPasswordRequest
} from "../api";

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_REQUEST_SUCCESS = 'GET_AUTH_REQUEST_SUCCESS';
export const GET_AUTH_REQUEST_FIELD = 'GET_AUTH_REQUEST_FIELD';
export const SET_USER_FORM_VALUE = 'USER_FORM_SET_VALUE'
export const SET_RESET_PASSWORD_STATUS = 'SET_RESET_PASSWORD_STATUS'

export const setUserFormValue = (field, value) => ({
    type: SET_USER_FORM_VALUE,
    payload: {
        field,
        value
    }
})

export function registerUser() {
    return function (dispatch, getState) {
        dispatch({type: GET_AUTH_REQUEST});
        getRegisterUserRequest(getState().auth.authUserForm)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                data.accessToken = data.accessToken.split('Bearer ')[1];
                dispatch({type: SET_CURRENT_USER, payload: data})
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function loginUser() {
    return function (dispatch, getState) {
        dispatch({type: GET_AUTH_REQUEST});
        getLoginUserRequest(getState().auth.authUserForm)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                data.accessToken = data.accessToken.split('Bearer ')[1];
                dispatch({type: SET_CURRENT_USER, payload: data})
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
        getLogoutUserRequest(getState().auth.refreshToken)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                data.accessToken = data.accessToken.split('Bearer ')[1];
                dispatch({type: SET_CURRENT_USER, payload: data})
            })
            .catch(dispatch({type: GET_AUTH_REQUEST_FIELD}));
    }
}

export function forgotPassword() {
    return function (dispatch, getState) {
        dispatch({type: GET_AUTH_REQUEST});
        getForgotPasswordRequest(getState().auth.authUserForm)
            .then(checkResponse)
            .then(data => {
                dispatch({type: GET_AUTH_REQUEST_SUCCESS});
                dispatch({type: SET_RESET_PASSWORD_STATUS})
            })
            .catch((e) => {
                    dispatch({type: GET_AUTH_REQUEST_FIELD, payload: e.message})
                }
            );
    }
}

export function resetPassword() {
    return function (dispatch, getState) {
        dispatch({type: GET_AUTH_REQUEST});
        getResetPasswordRequest(getState().auth.authUserForm)
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