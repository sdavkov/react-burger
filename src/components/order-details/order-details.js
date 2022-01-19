import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './order-details.module.css'
import orderImage from '../../images/order.svg'
import { BurgerConstructorContext } from '../../services/burger-constructor-context'

const OrderDetails = React.memo(() => {
    
    const [burgerConstructorState] = useContext(BurgerConstructorContext)

    return (
        <div className={styles.details}>
            <p className={styles.number + ' text text_type_digits-large mt-2 mb-8'}>{burgerConstructorState.order.order.number}</p>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img className='mb-15 mt-15' src={orderImage} />
            <p className="text text_type_main-medium mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-medium text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
})

OrderDetails.propTypes = {
}

export default OrderDetails
