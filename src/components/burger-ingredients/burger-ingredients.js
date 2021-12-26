import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItems from '../burger-ingredients-items/burger-ingredients-items'
import { burgerIngredientsPropTypes, cartPropTypes } from '../../utils/ptop-types'

const BurgerIngredients = ({ burgerIngredients, cart }) => {

    const refBun = useRef(null);
    const refMain = useRef(null);
    const refSauce = useRef(null);

    const [typeOfBurgerIngredients, setTypeOfBurgerIngredients] = useState('bun')

    const changefBurgerIngredientsType = type => {
        setTypeOfBurgerIngredients(type);
        if (type === 'bun') refBun.current.scrollIntoView({ behavior: 'smooth' })
        if (type === 'sauce') refSauce.current.scrollIntoView({ behavior: 'smooth' })
        if (type === 'main') refMain.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.ingredients + ' mr-10'}>
            <p className='text_type_main-large pt-10 pb-5'>Соберите бургер</p>
            <div className={styles.tab}>
                <Tab value="bun" active={typeOfBurgerIngredients === 'bun'} onClick={changefBurgerIngredientsType}>
                    Булки
                </Tab>
                <Tab value="sauce" active={typeOfBurgerIngredients === 'sauce'} onClick={changefBurgerIngredientsType}>
                    Соусы
                </Tab>
                <Tab value="main" active={typeOfBurgerIngredients === 'main'} onClick={changefBurgerIngredientsType}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.items}>
                <BurgerIngredientsItems refObj={refBun} title='Булки' burgerIngredients={burgerIngredients.filter(item => item.type === 'bun')} cart={cart} />
                <BurgerIngredientsItems refObj={refSauce} title='Соусы' burgerIngredients={burgerIngredients.filter(item => item.type === 'sauce')} cart={cart} />
                <BurgerIngredientsItems refObj={refMain} title='Начинки' burgerIngredients={burgerIngredients.filter(item => item.type === 'main')} cart={cart} />
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart: PropTypes.arrayOf(cartPropTypes).isRequired,
}

export default BurgerIngredients
