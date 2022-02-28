import { AnyAction } from 'redux';
import { IAuthState } from '../../utils/ts-types';
import {
    GET_AUTH_REQUEST,
    GET_AUTH_REQUEST_FIELD,
    GET_AUTH_REQUEST_SUCCESS, LOGOUT_USER,
    SET_CURRENT_USER
} from "../actions/auth";

const initialState: IAuthState = {
    authRequest: false,
    authRequestFailed: false,
    authRequestFailedMessage: '',
}

export const authReducer: (state: IAuthState, action: AnyAction) => IAuthState = (state = initialState, action) => {
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
            const user = action.payload.user;
            return {
                ...state,
                currentUser: {
                    name: user.name,
                    email: user.email,
                }
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                currentUser: undefined,
            }
        }
        default:
            return state;
    }
}