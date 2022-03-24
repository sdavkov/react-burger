import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FunctionComponent } from 'react'
import { IOrderIngredient } from '../../hooks/useOrderIngredients';
import { OrderIngredientImg } from '../order-ingredient-img/order-ingredient-img';
import styles from './feed-order-detail-ingredient.module.css';

interface IFeedOrderDetailIngredientProps {
	fullIngredient: IOrderIngredient;
}

const FeedOrderDetailIngredient: FunctionComponent<IFeedOrderDetailIngredientProps> = ({ fullIngredient }) => {
	return (
		<div className={styles.ingredient + ' mb-4'}>
			<div className={styles.img}>
				<OrderIngredientImg ingredient={fullIngredient.ingredient} zIndex={1} />
			</div>
			<div className={styles.title + ' ml-4 mr-4'}>
				<p className="text text_type_main-default">{fullIngredient.ingredient.name}</p>
			</div>
			<div className={styles.summary}>
				<p className="text text_type_main-medium mr-2" style={{}}>{fullIngredient.count} x {fullIngredient.ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
		</div>
	)
}

export default FeedOrderDetailIngredient