import { API_URL } from "../utils/constants";
import { ICart, IForgotPasswordForm, ILoginForm, IRegisterForm, IResetPasswordForm, IUserProfileForm } from '../utils/ts-types';

export async function checkResponse(res: Response) {
    if (res.ok)
        return res.json();
    else {
        let data = null;
        try {
            data = await res.json();
        } finally {
            return Promise.reject(new Error(`Ошибка ${res.status}` + (data ? `: ${data.message}` : '')));
        }
    }
}

export const getCreateOrderRequest = async (cart: ICart[], token: string) =>
    await fetch(`${API_URL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ ingredients: cart.map(item => item.burgerIngredient._id) })
    });

export const getBurgerIngredientsRequest = async () =>
    await fetch(`${API_URL}ingredients`);

export const getRegisterUserRequest = async ({ name, email, password }: IRegisterForm) => await
    fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password, name })
    });

export const getLoginUserRequest = async ({ email, password }: ILoginForm) => await
    fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password })
    });

export const getLogoutUserRequest = async (token: string) => await
    fetch(`${API_URL}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token })
    });

export const getUserRequest = async (token: string) => await
    fetch(`${API_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
    });

export const getUpdateUserRequest = async ({ name, email, password }: IUserProfileForm, token: string) => await
    fetch(`${API_URL}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ name, email, password })
    });

export const getRefreshTokenRequest = async (token: string) =>
    fetch(`${API_URL}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ token })
    });

export const getForgotPasswordRequest = async ({ email }: IForgotPasswordForm) => await
    fetch(`${API_URL}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email })
    });

export const getResetPasswordRequest = async ({ password, token }: IResetPasswordForm) => await
    fetch(`${API_URL}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ password, token })
    });