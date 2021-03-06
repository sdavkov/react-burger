import { useMemo } from 'react';
import { useAppSelector } from '../services/store';
import { TBurgerIngredient } from '../services/types/data';
import { TOrder } from '../services/types/web-sockets';

export interface IOrderIngredient {
	ingredient: TBurgerIngredient;
	count: number;
}

function useOrderIngredients(order: TOrder | undefined) {
	const burgerIngredients = useAppSelector(state => state.burgerIngredients.burgerIngredients);
	const { fullIngredients, total } = useMemo(() => {
		if (order) {
			return order.ingredients.reduce<{ fullIngredients: IOrderIngredient[], total: number }>((res, orderIngredient) => {
				const fullIngredient = res.fullIngredients.find(item => item.ingredient._id === orderIngredient);
				if (!fullIngredient) {
					const ingredient = burgerIngredients.find((item) => item._id === orderIngredient);
					if (ingredient) {
						res.fullIngredients.push({ ingredient, count: 1 });
						res.total += ingredient.price;
					}
				}
				else {
					fullIngredient.count += 1;
					res.total += fullIngredient.ingredient.price;
				}

				return res;
			}, { fullIngredients: [], total: 0 })
		}
		else {
			return { fullIngredients: [], total: 0 }
		}
	}, [order, burgerIngredients])

	return { fullIngredients, total }
}

export default useOrderIngredients