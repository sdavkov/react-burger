import { v4 as uuidv4 } from 'uuid';

export const createRandomBurgerConstructor = (ingredients) => {
    const bun = ingredients.find((item) => item.type === 'bun');
    const additionals = ingredients.filter(item => item.type !== 'bun');
    if (bun && additionals) {
        const result = [createCart(bun)];
        for (let index = 0; index < 4; index++) {
            const i = Math.floor(Math.random() * additionals.length);
            const additional = additionals[i];
            result.push(createCart(additional));
        }
        return result;
    }
}

export const createCart = (ingredient) => {
    return { cart_id: uuidv4(), ingredient };
}