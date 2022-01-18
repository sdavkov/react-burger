export default class IngredientsService {
    static async fetchIngredients() {
        const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
        if (!res.ok)
            throw new Error(`Неверный ответ сервера: ${res.status}`)
        const data = await res.json();
        return data.data;
    }
}