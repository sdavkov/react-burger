import React from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-burger-constructor.module.css'
import { useHistory } from "react-router-dom";
import { useAppSelector } from '../../services/store';

function TotalBurgerConstructor() {

    const history = useHistory();
    const total = useAppSelector(state => state.burgerConstructor.total)
    const handlerButtonClick = () => {
        history.push('/create-new-order');
    }

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
