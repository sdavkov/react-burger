import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItems from '../burger-ingredients-items/burger-ingredients-items'
import { burgerIngredientsPropTypes, cartPropTypes } from '../../utils/ptop-types'

const BurgerIngredients = ({ burgerIngredients, cart }) => {

    const [typeOfBurgerIngredients, setTypeOfBurgerIngredients] = useState('bun')

    return (
        <div className={styles.ingredients + ' mr-10'}>
            <p className='text_type_main-large pt-10 pb-5'>Соберите бургер</p>
            <div className={styles.tab}>
                <Tab value="bun" active={typeOfBurgerIngredients === 'bun'} onClick={setTypeOfBurgerIngredients}>
                    Булки
                </Tab>
                <Tab value="sauce" active={typeOfBurgerIngredients === 'sauce'} onClick={setTypeOfBurgerIngredients}>
                    Соусы
                </Tab>
                <Tab value="main" active={typeOfBurgerIngredients === 'main'} onClick={setTypeOfBurgerIngredients}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.items}>
                <BurgerIngredientsItems title='Булки' burgerIngredients={burgerIngredients.filter(item => item.type === 'bun')} cart={cart} />
                <BurgerIngredientsItems title='Соусы' burgerIngredients={burgerIngredients.filter(item => item.type === 'sauce')} cart={cart} />
                <BurgerIngredientsItems title='Начинки' burgerIngredients={burgerIngredients.filter(item => item.type === 'main')} cart={cart} />
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    burgerIngredients:  PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart:  PropTypes.arrayOf(cartPropTypes).isRequired,
}

export default BurgerIngredients
