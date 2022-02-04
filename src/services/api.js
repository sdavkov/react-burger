import {API_URL} from "../utils/constants";

export async function checkResponse(res) {
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

export const getCreateOrderRequest = async (cart) =>
    await fetch(`${API_URL}orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients: cart.map(item => item.burgerIngredient._id)})
    });

export const getBurgerIngredientsRequest = async () =>
    await fetch(`${API_URL}ingredients`);

export const getForgotPasswordRequest = async ({email}) => await
    fetch(`${API_URL}password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email})
    });

export const getResetPasswordRequest = async ({password, token}) => await
    fetch(`${API_URL}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({password, token})
    });

export const getLoginUserRequest = async ({email, password}) => await
    fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email, password})
    });

export const getRegisterUserRequest = async ({name, email, password}) => await
    fetch(`${API_URL}auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email, password, name})
    });

export const getLogoutUserRequest = async (token) => await
    fetch(`${API_URL}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token})
    });

export const getRefreshTokenRequest = async (token) => await
    fetch(`${API_URL}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token})
    });