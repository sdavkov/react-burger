import React, { FunctionComponent, useMemo } from 'react'
import styles from './order-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory, useLocation } from 'react-router-dom';
import { TOrder } from '../../services/slices/web-socket';
import { OrderIngredientImg } from '../order-ingredient-img/order-ingredient-img';
import { formatDateFromOrder } from '../../utils/common';
import useOrderIngredients from '../../hooks/useOrderIngredients';

interface IFeedOrderProps {
	order: TOrder;
}

const OrderItem: FunctionComponent<IFeedOrderProps> = ({ order }) => {
	const location = useLocation();
	const history = useHistory();
	const { fullIngredients, total } = useOrderIngredients(order);

	const onClickHandler = () => {
		history.push(`/feed/${order._id}`, { background: location });
	}

	return (
		<div className={styles.order} onClick={onClickHandler}>
			<div className={styles.info}>
				<p className="text text_type_digits-default">#{order.number}</p>
				<p className="text text_type_main-default text_color_inactive">
					{formatDateFromOrder(order.createdAt)}
				</p>
			</div>
			<p className="text text_type_main-medium mb-6">
				{order.name}
			</p>
			<div className={styles.ingredients}>
				<div className={styles.ingredients_list + " mr-6"}>
					{fullIngredients.map((fullIngredient, index) => (<OrderIngredientImg key={index} ingredient={fullIngredient.ingredient} zIndex={fullIngredients.length - index} />))}
				</div>
				<div className={styles.ingredients_total}>
					<p className={styles.sum + " text text_type_digits-medium"}>{total}</p><CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}

export default OrderItem;