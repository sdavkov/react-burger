import {
    SET_USER_FORM_VALUE,
    GET_AUTH_REQUEST,
    GET_AUTH_REQUEST_FIELD,
    GET_AUTH_REQUEST_SUCCESS,
    SET_CURRENT_USER, SET_RESET_PASSWORD_STATUS
} from "../actions/auth";

const initialState = {
    authUserForm: {
        name: '',
        email: '',
        password: '',
        token: '',
    },
    currentUser: null,
    accessToken: '',
    refreshToken: '',
    authRequest: false,
    authRequestFailed: false,
    authRequestFailedMessage: '',
    resetPassword: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_FORM_VALUE: {
            const {field, value} = action.payload;
            return {
                ...state,
                authUserForm: {
                    ...state.authUserForm,
                    [field]: value,
                }
            }
        }
        case GET_AUTH_REQUEST:
            return {
                ...state,
                authRequest: true,
                authRequestFailed: false,
                authRequestFailedMessage: '',
            }
        case GET_AUTH_REQUEST_SUCCESS:
            return {
                ...state,
                authUserForm: initialState.authUserForm,
                authRequest: false,
                authRequestFailed: false,
                authRequestFailedMessage: ''
            }
        case GET_AUTH_REQUEST_FIELD:
            return {
                ...state,
                authRequest: false,
                authRequestFailed: true,
                authRequestFailedMessage: action.payload
            }
        case SET_CURRENT_USER: {
            const {user: {name, email}, accessToken, refreshToken} = action.payload;
            return {
                ...state,
                currentUser: {
                    name,
                    email,
                },
                accessToken,
                refreshToken,
            }
        }
        case SET_RESET_PASSWORD_STATUS:
            return {
                ...state,
                resetPassword: true,
            }
        default:
            return state;
    }
}