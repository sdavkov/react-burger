import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useParams } from 'react-router-dom'
import useOrderIngredients from '../../hooks/useOrderIngredients'
import useWebSocket from '../../hooks/useWebSocket'
import { useAppSelector } from '../../services/store'
import { formatDateFromOrder, orderStatusToString } from '../../utils/common'
import FeedOrderDetailIngredient from '../feed-order-detail-ingredient/feed-order-detail-ingredient'
import styles from './order-detail.module.css'

const OrderDetail = () => {
	useWebSocket();
	const { id } = useParams<{ id: string }>()
	const order = useAppSelector(state => state.webSocket.orders.find(order => order._id === id));
	const { fullIngredients, total } = useOrderIngredients(order);


	let styleStatus = 'text text_type_main-medium mb-15 ';
	if (order?.status === 'done') {
		styleStatus += styles.done_status;
	}
	return (
		<>
			{order && (
				<div className={styles.feed_order_detail}>
					<p className={styles.header + " text text_type_digits-default mb-10"}>#{order.number}</p>
					<p className="text text_type_main-medium mb-3">{order.name}</p>
					<p className={styleStatus}>{orderStatusToString(order.status)}</p>
					<p className="text text_type_main-medium mb-6">Состав</p>
					<div className={styles.ingredients + ' custom-scroll pr-6'}>
						{fullIngredients.map((fullIngredient, index) => (
							<FeedOrderDetailIngredient key={index} fullIngredient={fullIngredient} />
						))}
					</div>
					<div className={styles.footer + ' mt-10'}>
						<p className="text text_type_main-default text_color_inactive">
							{formatDateFromOrder(order.createdAt)}
						</p>
						<div className={styles.total}>
							<p className="text text_type_main-medium mr-2">{total}</p>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</div>
			)
			}
		</>
	)
}

export default OrderDetail
