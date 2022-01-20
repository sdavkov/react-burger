import { API_URL } from "../utils/constants";

export default class OrdersService {
    static async createOrder(ingredients) {
        const res = await fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ingredients: ingredients.map(item => item.ingredient._id) })
        });
        if (!res.ok)
            throw new Error(`Неверный ответ сервера: ${res.status}`)
        const data = await res.json();
        return data;
    }
}