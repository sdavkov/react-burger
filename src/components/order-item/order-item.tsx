import React, { FunctionComponent, useMemo } from 'react'
import styles from './order-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderIngredientImg } from '../order-ingredient-img/order-ingredient-img';
import { formatDateFromOrder } from '../../utils/common';
import useOrderIngredients from '../../hooks/useOrderIngredients';
import { TOrder } from '../../services/types/web-sockets';

interface IFeedOrderProps {
	order: TOrder;
	onClickHandler: (order_id: string) => void;
}

const OrderItem: FunctionComponent<IFeedOrderProps> = ({ order, onClickHandler }) => {
	const { fullIngredients, total } = useOrderIngredients(order);

	return (
		<div className={styles.order} onClick={() => onClickHandler(order._id)}>
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
		</div >
	)
}

export default OrderItem;