import React, {useCallback} from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-burger-constructor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/burger-constructor";

function TotalBurgerConstructor() {

    const dispatch = useDispatch();
    const total = useSelector(store => store.burgerConstructor.total)
    const handlerButtonClick = useCallback(() => {
        dispatch(createOrder())
    }, [dispatch])

    return (
        <div className={styles.total + ' mt-10 mb-10 mr-10'}>
            <div className={styles.sum + ' mr-10'}>
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handlerButtonClick} >
                Оформить заказ
            </Button>
        </div>
    )
}

export default TotalBurgerConstructor
