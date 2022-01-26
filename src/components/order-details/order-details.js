import React from 'react'
import styles from './order-details.module.css'
import orderImage from '../../images/order.svg'
import {useSelector} from "react-redux";

const OrderDetails = React.memo(() => {

    const currentOrderNumber = useSelector(store => store.burgerConstructor.currentOrderNumber)

    return (
        <div className={styles.details}>
            <p className={styles.number + ' text text_type_digits-large mt-2 mb-8'}>{currentOrderNumber}</p>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img className='mb-15 mt-15' src={orderImage} alt=''/>
            <p className="text text_type_main-medium mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-medium text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
})

export default OrderDetails
