import {
    GET_AUTH_REQUEST,
    GET_AUTH_REQUEST_FIELD,
    GET_AUTH_REQUEST_SUCCESS, LOGOUT_USER,
    SET_CURRENT_USER
} from "../actions/auth";

const initialState = {
    currentUser: null,
    authRequest: false,
    authRequestFailed: false,
    authRequestFailedMessage: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
            const {user: {name, email}} = action.payload;
            return {
                ...state,
                currentUser: {
                    name,
                    email,
                }
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                currentUser: null,
            }
        }
        default:
            return state;
    }
}