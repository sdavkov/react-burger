import React, { FunctionComponent } from 'react'
import { TBurgerIngredient } from '../../services/types/data'
import styles from './order-ingredient-img.module.css'

interface IOrderIngredientProps {
	ingredient: TBurgerIngredient;
	zIndex: number;
}

export const OrderIngredientImg: FunctionComponent<IOrderIngredientProps> = ({ ingredient, zIndex }) => {
	return (
		<div className={styles.ingredient} style={{ zIndex }}><img src={ingredient.image} alt='' /></div>
	)
}
