import React from 'react'
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";

const IngredientDetails = React.memo(() => {

    const {currentBurgerIngredient} = useSelector(store => ({
        currentBurgerIngredient: store.burgerIngredients.currentBurgerIngredient,
    }))

    return (
        <div className={styles.ingredient}>
            <img className={styles.image + ' mb-4'} src={currentBurgerIngredient.image_large} alt={currentBurgerIngredient.name}/>
            <p className="text text_type_main-medium mb-8">{currentBurgerIngredient.name}</p>
            <div className={styles.analyzes + ' text_color_inactive mb-15'}>
                <div className={styles.analysis + ' mr-5'}>
                    <p className='text text_type_main-default mb-3'>Каллории, ккал</p>
                    <p className='text text_type_digits-default'>{currentBurgerIngredient.calories}</p>
                </div>
                <div className={styles.analysis + ' mr-5'}>
                    <p className='text text_type_main-default mb-3'>Белки, г</p>
                    <p className='text text_type_digits-default'>{currentBurgerIngredient.proteins}</p>
                </div>
                <div className={styles.analysis + ' mr-5'}>
                    <p className='text text_type_main-default mb-3'>Жиры, г</p>
                    <p className='text text_type_digits-default'>{currentBurgerIngredient.fat}</p>
                </div>
                <div className={styles.analysis}>
                    <p className='text text_type_main-default mb-3'>Углеводы, г</p>
                    <p className='text text_type_digits-default'>{currentBurgerIngredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
})

export default IngredientDetails
