import React, { FunctionComponent, useMemo } from 'react'
import styles from './feed-order.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory, useLocation } from 'react-router-dom';
import { TOrder } from '../../services/slices/web-socket';
import { RootState } from '../../services/types';
import { useSelector } from 'react-redux';
import { TBurgerIngredient } from '../../services/types/data';
import { OrderIngredient } from '../order-ingredient/order-ingredients';

interface IFeedOrderProps {
	order: TOrder;
}

function formatDate(date: string): string {
	const day = 1000 * 60 * 60 * 24;
	const currentDate = new Date();
	const orderDate = new Date(date);
	const different = currentDate.getTime() - orderDate.getTime();
	let res = '';
	if (different < day)
		res = 'Сегодня'
	else if (different < day * 2)
		res = 'Вчера'
	else
		res = `${Math.trunc(different / day)} дня назад`;

	res += `, ${orderDate.toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).substring(12)}`;
	return res;
}

const FeedOrder: FunctionComponent<IFeedOrderProps> = ({ order }) => {
	const location = useLocation();
	const history = useHistory();

	const burgerIngredients = useSelector((state: RootState) => state.burgerIngredients.burgerIngredients);
	const { fullIngredients, total } = useMemo(() => {
		return order.ingredients.reduce<{ fullIngredients: TBurgerIngredient[], total: number }>((res, ingredient) => {
			const fullIngredient = burgerIngredients.find((item) => item._id === ingredient);
			if (fullIngredient) {
				res.fullIngredients.push(fullIngredient);
				res.total += fullIngredient.price;
			}
			return res;
		}, { fullIngredients: [], total: 0 })
	}, [order, burgerIngredients])

	const onClickHandler = () => {
		//history.push(`/ ingredients / ${ burgerIngredient._id } `, { background: location })
	}

	return (
		<div className={styles.order} onClick={onClickHandler}>
			<div className={styles.info}>
				<p className="text text_type_digits-default">#{order.number}</p>
				<p className="text text_type_main-default text_color_inactive">
					{formatDate(order.createdAt)}
				</p>
			</div>
			<p className="text text_type_main-medium mb-6">
				{order.name}
			</p>
			<div className={styles.ingredients}>
				<div className={styles.ingredients_list + " mr-6"}>
					{fullIngredients.map((ingredient, index) => (<OrderIngredient key={index} ingredient={ingredient} zIndex={fullIngredients.length - index} />))}
				</div>
				<div className={styles.ingredients_total}>
					<p className={styles.sum + " text text_type_digits-medium"}>{total}</p><CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}

export default FeedOrder;