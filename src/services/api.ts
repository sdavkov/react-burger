import { API_URL } from "../utils/constants";
import { TBurgerIngredient, TCart, TCreatedOrder, TUser } from './types/data';
import { IRegisterForm } from '../pages/register/register';
import { IResetPasswordForm } from '../pages/reset-password/reset-password';
import { ILoginForm } from '../pages/login/login';
import { IUserProfileForm } from '../components/user-profile/user-profile';
import { IForgotPasswordForm } from '../pages/forgot-password/forgot-password';

export async function checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json() as Promise<T>;
    }

    const data = await res.json();
    if (data.message === "jwt expired") {
        return Promise.reject(new Error("jwt expired"));
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export const getCreateOrderRequest = async (cart: TCart[], token: string) =>
    await fetch(`${API_URL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ ingredients: cart.map(item => item.burgerIngredient._id) })
    }).then((res) => checkResponse<{ name: string; order: TCreatedOrder; success: boolean; }>(res));

export const getBurgerIngredientsRequest = async () =>
    await fetch(`${API_URL}ingredients`).then((res) =>
        checkResponse<{ data: TBurgerIngredient[]; success: boolean }>(res)
    );

export const getRegisterUserRequest = async ({ name, email, password }: IRegisterForm) => await
    fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password, name })
    }).then((res) => checkResponse<{ user: TUser; accessToken: string, refreshToken: string; success: boolean; }>(res));

export const getLoginUserRequest = async ({ email, password }: ILoginForm) => await
    fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password })
    }).then((res) => checkResponse<{ user: TUser; accessToken: string, refreshToken: string; success: boolean; }>(res));;

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
    }).then((res) => checkResponse<{ user: TUser, success: boolean }>(res));

export const getUpdateUserRequest = async ({ name, email, password }: IUserProfileForm, token: string) => await
    fetch(`${API_URL}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ name, email, password })
    }).then((res) => checkResponse<{ data: TUser, success: boolean }>(res));

export const getRefreshTokenRequest = async (token: string) =>
    fetch(`${API_URL}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ token })
    }).then((res) => checkResponse<{ accessToken: string; refreshToken: string; success: boolean; }>(res));

export const getForgotPasswordRequest = async ({ email }: IForgotPasswordForm) => await
    fetch(`${API_URL}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email })
    }).then((res) => checkResponse<{ message: string; success: boolean; }>(res));

export const getResetPasswordRequest = async ({ password, token }: IResetPasswordForm) => await
    fetch(`${API_URL}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ password, token })
    }).then((res) => checkResponse<{ message: string; success: boolean; }>(res));;