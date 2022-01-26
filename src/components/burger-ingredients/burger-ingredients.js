import React, {useCallback, useRef, useState} from 'react'
import styles from './burger-ingredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItems from '../burger-ingredients-items/burger-ingredients-items'

const BurgerIngredients = React.memo(() => {

    const [activeTypeOfBurgerIngredients, setActiveTypeOfBurgerIngredients] = useState('bun')

    const refBun = useRef(null);
    const refMain = useRef(null);
    const refSauce = useRef(null);

    const changeActiveTypeOfBurgerIngredients = useCallback(type => {
        setActiveTypeOfBurgerIngredients(type);
        if (type === 'bun') refBun.current.scrollIntoView({behavior: 'smooth'})
        if (type === 'sauce') refSauce.current.scrollIntoView({behavior: 'smooth'})
        if (type === 'main') refMain.current.scrollIntoView({behavior: 'smooth'})
    }, [])

    return (
        <div className={styles.ingredients + ' pb-5'}>
            <p className='text_type_main-large pt-10 pb-5'>Соберите бургер</p>
            <div className={styles.tab}>
                <Tab value="bun" active={activeTypeOfBurgerIngredients === 'bun'}
                     onClick={changeActiveTypeOfBurgerIngredients}>
                    Булки
                </Tab>
                <Tab value="sauce" active={activeTypeOfBurgerIngredients === 'sauce'}
                     onClick={changeActiveTypeOfBurgerIngredients}>
                    Соусы
                </Tab>
                <Tab value="main" active={activeTypeOfBurgerIngredients === 'main'}
                     onClick={changeActiveTypeOfBurgerIngredients}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.items + ' custom-scroll'}>
                <BurgerIngredientsItems ref={refBun} title='Булки' type='bun'/>
                <BurgerIngredientsItems ref={refSauce} title='Соусы' type='sauce'/>
                <BurgerIngredientsItems ref={refMain} title='Начинки' type='main'/>
            </div>
        </div>
    )
})

export default BurgerIngredients
