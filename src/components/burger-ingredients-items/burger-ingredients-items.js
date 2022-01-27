import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients-items.module.css'
import {useSelector} from "react-redux";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";

const BurgerIngredientsItems = React.memo(React.forwardRef(({title, type}, ref) => {

    const burgerIngredients = useSelector(store => store.burgerIngredients.burgerIngredients);

    return (
        <>
            <p ref={ref} className='text text_type_main-medium pt-10'>{title}</p>
            <div className={styles.items + ' mb-10'}>
                {burgerIngredients.filter(i => i.type === type).map(item => (
                    <BurgerIngredientItem key={item._id} burgerIngredient={item} />
                ))}
            </div>
        </>
    )
}))

BurgerIngredientsItems.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}
export default BurgerIngredientsItems
