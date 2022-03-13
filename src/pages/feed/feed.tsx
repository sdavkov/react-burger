import React from 'react'
import styles from './feed.module.css'
import FeedOrder from '../../components/feed-order/feed-order'

export default function FeedPage() {
	return (
		<div className={styles.feed}>
			<p className='text_type_main-large'>Лента заказов</p>
			<div className={styles.container}>
				<div className={styles.orders + ' custom-scroll pr-2'}>
					<FeedOrder />
					<FeedOrder />
					<FeedOrder />
					<FeedOrder />
					<FeedOrder />
				</div>
				<div className={styles.dashboard}>
					<div className={styles.row + ' mb-15'}>
						<div className={styles.done + '  mr-9'}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									Готовы:
								</p>
								<p className="text text_type_digits-default mb-2">034533</p>
								<p className="text text_type_digits-default mb-2">034532</p>
								<p className="text text_type_digits-default mb-2">034530</p>
								<p className="text text_type_digits-default mb-2">034527</p>
								<p className="text text_type_digits-default mb-2">034525</p>
							</div>
						</div>
						<div className={styles.in_work}>
							<div className="col">
								<p className="text text_type_main-medium mb-6">
									В работе:
								</p>
								<p className="text text_type_digits-default mb-2">034533</p>
								<p className="text text_type_digits-default mb-2">034532</p>
								<p className="text text_type_digits-default mb-2">034530</p>
								<p className="text text_type_digits-default mb-2">034527</p>
								<p className="text text_type_digits-default mb-2">034525</p>
							</div>
						</div>
					</div>
					<div className='mb-15'>
						<p className="text text_type_main-medium">
							Выполнено за все время:
						</p>
						<p className={styles.number + ' text text_type_digits-large'}>28 752</p>
					</div>
					<div className='mb-15'>
						<p className="text text_type_main-medium">
							Выполнено за сегодня:
						</p>
						<p className={styles.number + ' text text_type_digits-large'}>28 752</p>
					</div>
				</div>
			</div>
		</div >
	)
}
