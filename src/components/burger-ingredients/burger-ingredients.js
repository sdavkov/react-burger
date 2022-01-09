import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItems from '../burger-ingredients-items/burger-ingredients-items'
import { burgerIngredientsPropTypes } from '../../utils/ptop-types'

const BurgerIngredients = React.memo(({ burgerIngredients, cart, setCurrentIngredient, setVisibleIngredientDetail }) => {

    const [activeTypeOfBurgerIngredients, setActiveTypeOfBurgerIngredients] = useState('bun')

    const refBun = useRef(null);
    const refMain = useRef(null);
    const refSauce = useRef(null);

    const changeActiveTypeOfBurgerIngredients = useCallback(type => {
        setActiveTypeOfBurgerIngredients(type);
        if (type === 'bun') refBun.current.scrollIntoView({ behavior: 'smooth' })
        if (type === 'sauce') refSauce.current.scrollIntoView({ behavior: 'smooth' })
        if (type === 'main') refMain.current.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <div className={styles.ingredients + ' pb-5'}>
            <p className='text_type_main-large pt-10 pb-5'>Соберите бургер</p>
            <div className={styles.tab}>
                <Tab value="bun" active={activeTypeOfBurgerIngredients === 'bun'} onClick={changeActiveTypeOfBurgerIngredients}>
                    Булки
                </Tab>
                <Tab value="sauce" active={activeTypeOfBurgerIngredients === 'sauce'} onClick={changeActiveTypeOfBurgerIngredients}>
                    Соусы
                </Tab>
                <Tab value="main" active={activeTypeOfBurgerIngredients === 'main'} onClick={changeActiveTypeOfBurgerIngredients}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.items + ' custom-scroll'}>
                <BurgerIngredientsItems ref={refBun} title='Булки' burgerIngredients={burgerIngredients.filter(item => item.type === 'bun')} cart={cart} setCurrentIngredient={setCurrentIngredient} setVisibleIngredientDetail={setVisibleIngredientDetail} />
                <BurgerIngredientsItems ref={refSauce} title='Соусы' burgerIngredients={burgerIngredients.filter(item => item.type === 'sauce')} cart={cart} setCurrentIngredient={setCurrentIngredient} setVisibleIngredientDetail={setVisibleIngredientDetail} />
                <BurgerIngredientsItems ref={refMain} title='Начинки' burgerIngredients={burgerIngredients.filter(item => item.type === 'main')} cart={cart} setCurrentIngredient={setCurrentIngredient} setVisibleIngredientDetail={setVisibleIngredientDetail} />
            </div>
        </div>
    )
})

BurgerIngredients.propTypes = {
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    setCurrentIngredient: PropTypes.func,
    setVisibleIngredientDetail: PropTypes.func
}

export default BurgerIngredients
