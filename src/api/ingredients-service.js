import { API_URL } from "../utils/constants";

export default class IngredientsService {
    static async fetchIngredients() {
        const res = await fetch(`${API_URL}ingredients`);
        if (!res.ok)
            throw new Error(`Неверный ответ сервера: ${res.status}`)
        const data = await res.json();
        return data.data;
    }
}