export const randomIngredients = (ingredients) => {
    const bun = ingredients.find((item) => item.type === 'bun');
    const additionals = ingredients.filter(item => item.type !== 'bun');
    if (bun && additionals) {
        const result = [bun];
        for (let index = 0; index < 4; index++) {
            const i = Math.floor(Math.random() * additionals.length);
            const additional = additionals[i];
            result.push(additional);
        }
        return result;
    }
}