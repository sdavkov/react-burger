import React from 'react'
import styles from './feed-order.module.css'
import bun from '../../images/bun.png'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function FeedOrder() {
	return (
		<div className={styles.order}>
			<div className={styles.info}>
				<p className="text text_type_digits-default">#1234567890</p>
				<p className="text text_type_main-default text_color_inactive">
					Сегодня, 16:20 i-GMT+3
				</p>
			</div>
			<p className="text text_type_main-medium mb-6">
				Death Star Starship Main бургер
			</p>
			<div className={styles.ingredients}>
				<div className={styles.ingredients_list + " mr-6"}>
					<div className={styles.ingredient} style={{ zIndex: 5 }}><img src={bun} alt='' /></div>
					<div className={styles.ingredient} style={{ zIndex: 4 }}><img src={bun} alt='' /></div>
					<div className={styles.ingredient} style={{ zIndex: 3 }}><img src={bun} alt='' /></div>
					<div className={styles.ingredient} style={{ zIndex: 2 }}><img src={bun} alt='' /></div>
					<div className={styles.ingredient} style={{ zIndex: 1 }}><img src={bun} alt='' /></div>
				</div>
				<div className={styles.ingredients_total}>
					<p className={styles.sum + " text text_type_digits-medium"}>480</p><CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	)
}
