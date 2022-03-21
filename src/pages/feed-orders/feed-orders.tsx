import React, { useEffect } from 'react'
import styles from './feed-orders.module.css'
import OrderItem from '../../components/order-item/order-item'
import { AppDispatch, RootState } from '../../services/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { closedWSConnection, startWSConnection } from '../../services/slices/web-socket';
import { WSS_ALL_ORDERS_URL } from '../../utils/constants';

export default function FeedPage() {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(
		() => {
			dispatch(startWSConnection(WSS_ALL_ORDERS_URL));
			return () => { dispatch(closedWSConnection()) }
		},
		[dispatch]
	);

	const { orders, total, totalToday } = useSelector((state: RootState) => state.webSocket);

	const location = useLocation();
	const history = useHistory();

	const onClickHandler = (order_id: string) => {
		history.push(`/feed/${order_id}`, { background: location });
	}

	return (
		<div className={styles.feed}>
			<p className='text_type_main-large'>Лента заказов</p>
			<div className={styles.container}>
				<div className={styles.orders + ' custom-scroll pr-2'}>
					{orders.map((order) => (<OrderItem key={order._id} onClickHandler={onClickHandler} order={order} />))}
				</div>
				<div className={styles.dashboard}>
					<div className={styles.row + ' mb-15'}>
						<div className={styles.done + '  mr-9'}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									Готовы:
								</p>
								{orders.filter(i => i.status === 'done').slice(0, 5).map((order => (
									<p key={order._id} className={styles.row + " text text_type_digits-default mb-2"}>{order.number}</p>
								)))}
							</div>
						</div>
						<div className={styles.in_work}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									В работе:
								</p>
								{orders.filter(i => i.status !== 'done').slice(0, 5).map((order => (
									<p key={order._id} className="text text_type_digits-default mb-2">{order.number}</p>
								)))}
							</div>
						</div>
					</div>
					<div className='mb-15'>
						<p className="text text_type_main-medium">
							Выполнено за все время:
						</p>
						<p className={styles.number + ' text text_type_digits-large'}>{total}</p>
					</div>
					<div className='mb-15'>
						<p className="text text_type_main-medium">
							Выполнено за сегодня:
						</p>
						<p className={styles.number + ' text text_type_digits-large'}>{totalToday}</p>
					</div>
				</div>
			</div>
		</div >
	)
}
