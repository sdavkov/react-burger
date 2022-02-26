import React, { useEffect } from 'react'
import styles from './ingredient-details.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SET_CURRENT_BURGER_INGREDIENT } from "../../services/actions/burger-ingredients";
import { IRootState } from '../../utils/ts-types';

const IngredientDetails = React.memo(() => {

    const dispatch = useDispatch()
    const { ingredientId } = useParams<{ ingredientId: string }>()

    const { currentBurgerIngredient, burgerIngredientsRequest } = useSelector((state: IRootState) => state.burgerIngredients);

    useEffect(() => {
        dispatch({ type: SET_CURRENT_BURGER_INGREDIENT, payload: ingredientId });
    }, [dispatch, ingredientId, burgerIngredientsRequest])

    if (burgerIngredientsRequest)
        return null;

    return (
        <React.Fragment>
            {currentBurgerIngredient && (
                <div className={styles.ingredient}>
                    <img className={styles.image + ' mb-4'} src={currentBurgerIngredient.image_large}
                        alt={currentBurgerIngredient.name} />
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
            }
        </React.Fragment>
    )
})

export default IngredientDetails
