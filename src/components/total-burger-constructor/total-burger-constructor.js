import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './total-burger-constructor.module.css'
import { BurgerConstructorContext } from '../../context/burger-constructor-context'
import { useFetching } from '../../hooks/useFetching'
import OrdersService from '../../api/orders-service'
import { clearBurgerConstructorAction, setOrderAction } from '../../context/burger-constructor-reducer'


function TotalBurgerConstructor({ setVisibleOrderDetails }) {

    const [burgerConstructorState, dispatchBurgerConstructor] = useContext(BurgerConstructorContext)

    const [fetchCreateOrder, isLoading, error] = useFetching(async () => {
        const result = await OrdersService.createOrder(burgerConstructorState.cart)
        if (result.success) {
            dispatchBurgerConstructor(setOrderAction(result));
            setVisibleOrderDetails(true)
        }
    })

    return (
        <div className={styles.total + ' mt-10 mb-10 mr-10'}>
            <div className={styles.sum + ' mr-10'}>
                <p className="text text_type_digits-medium mr-2">{burgerConstructorState.total}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={fetchCreateOrder}>
                Оформить заказ
            </Button>
        </div>
    )
}

TotalBurgerConstructor.propTypes = {
    setVisibleOrderDetails: PropTypes.func
}

export default TotalBurgerConstructor
