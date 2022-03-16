import React from 'react'
import styles from './feed.module.css'
import FeedOrder from '../../components/feed-order/feed-order'
import { RootState } from '../../services/types';
import { useSelector } from 'react-redux';

export default function FeedPage() {

	const { orders, total, totalToday } = useSelector((state: RootState) => state.webSocket);
	console.log(orders.filter(i => i.status !== 'done').slice(0, 10))
	console.log(orders.filter(i => i.status === 'done').slice(0, 10))

	return (
		<div className={styles.feed}>
			<p className='text_type_main-large'>Лента заказов</p>
			<div className={styles.container}>
				<div className={styles.orders + ' custom-scroll pr-2'}>
					{orders.map((order) => (<FeedOrder key={order._id} order={order} />))}
				</div>
				<div className={styles.dashboard}>
					<div className={styles.row + ' mb-15'}>
						<div className={styles.done + '  mr-9'}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									Готовы:
								</p>
								{orders.filter(i => i.status === 'done').slice(0, 10).map((order => (
									<p key={order._id} className={styles.row + " text text_type_digits-default mb-2"}>{order.number}</p>
								)))}
							</div>
						</div>
						<div className={styles.in_work}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									В работе:
								</p>
								{orders.filter(i => i.status !== 'done').slice(0, 10).map((order => (
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
