import React, { useCallback, useRef, useState } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItems from '../burger-ingredients-items/burger-ingredients-items'
import {
    BURGER_INGREDIENT_BUN_TYPE,
    BURGER_INGREDIENT_MAIN_TYPE,
    BURGER_INGREDIENT_SAUCE_TYPE
} from "../../utils/constants";

const BurgerIngredients = React.memo(() => {

    const [activeTypeOfBurgerIngredients, setActiveTypeOfBurgerIngredients] = useState(BURGER_INGREDIENT_BUN_TYPE)

    const refRoot = useRef<HTMLParagraphElement>(null);
    const refBun = useRef<HTMLParagraphElement>(null);
    const refMain = useRef<HTMLParagraphElement>(null);
    const refSauce = useRef<HTMLParagraphElement>(null);

    const changeActiveTypeOfBurgerIngredients = useCallback(type => {
        setActiveTypeOfBurgerIngredients(type);
        if (type === BURGER_INGREDIENT_BUN_TYPE && refBun.current) refBun.current.scrollIntoView({ behavior: 'smooth' })
        if (type === BURGER_INGREDIENT_SAUCE_TYPE && refSauce.current) refSauce.current.scrollIntoView({ behavior: 'smooth' })
        if (type === BURGER_INGREDIENT_MAIN_TYPE && refMain.current) refMain.current.scrollIntoView({ behavior: 'smooth' })
    }, [refBun, refMain, refSauce, setActiveTypeOfBurgerIngredients])

    const handleScroll = useCallback(() => {
        if (refRoot.current && refBun.current && refSauce.current && refMain.current) {
            const bunDistance = Math.abs(refRoot.current.getBoundingClientRect().top - refBun.current.getBoundingClientRect().top)
            const sauceDistance = Math.abs(refRoot.current.getBoundingClientRect().top - refSauce.current.getBoundingClientRect().top)
            const mainDistance = Math.abs(refRoot.current.getBoundingClientRect().top - refMain.current.getBoundingClientRect().top)
            const min = Math.min(bunDistance, sauceDistance, mainDistance)
            const activeTab = min === bunDistance ? BURGER_INGREDIENT_BUN_TYPE : min === sauceDistance ? BURGER_INGREDIENT_SAUCE_TYPE : BURGER_INGREDIENT_MAIN_TYPE
            setActiveTypeOfBurgerIngredients(activeTab)
        }
    }, [refRoot, refBun, refMain, refSauce, setActiveTypeOfBurgerIngredients])

    return (
        <div className={styles.ingredients + ' pb-5'}>
            <p className='text_type_main-large pt-10 pb-5'>Соберите бургер</p>
            <div className={styles.tab}>
                <Tab value="bun" active={activeTypeOfBurgerIngredients === BURGER_INGREDIENT_BUN_TYPE}
                    onClick={changeActiveTypeOfBurgerIngredients}>
                    Булки
                </Tab>
                <Tab value="sauce" active={activeTypeOfBurgerIngredients === BURGER_INGREDIENT_SAUCE_TYPE}
                    onClick={changeActiveTypeOfBurgerIngredients}>
                    Соусы
                </Tab>
                <Tab value="main" active={activeTypeOfBurgerIngredients === BURGER_INGREDIENT_MAIN_TYPE}
                    onClick={changeActiveTypeOfBurgerIngredients}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.items + ' custom-scroll'} ref={refRoot} onScroll={handleScroll}>
                <BurgerIngredientsItems ref={refBun} title='Булки' type={BURGER_INGREDIENT_BUN_TYPE} />
                <BurgerIngredientsItems ref={refSauce} title='Соусы' type={BURGER_INGREDIENT_SAUCE_TYPE} />
                <BurgerIngredientsItems ref={refMain} title='Начинки' type={BURGER_INGREDIENT_MAIN_TYPE} />
            </div>
        </div>
    )
})

export default BurgerIngredients
