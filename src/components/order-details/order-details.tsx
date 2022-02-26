import React, { useEffect } from 'react'
import styles from './order-details.module.css'
import orderImage from '../../images/order.svg'
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/actions/burger-constructor";
import { IRootState } from '../../utils/ts-types';
import { AppDispatch } from '../../services/reducers';

const OrderDetails = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(createOrder())
    }, [dispatch])

    const { currentOrderNumber, orderRequest } = useSelector((state: IRootState) => state.burgerConstructor)
    return (
        <div className={styles.details}>
            {orderRequest ? (<React.Fragment>
                <p className="text text_type_main-medium">Загрузка заказа ...</p>
                <img className={styles.loader + ' mb-15 mt-15'} src={orderImage} alt='' />
            </React.Fragment>) : (
                <React.Fragment>
                    <p className={styles.number + ' text text_type_digits-large mt-2 mb-8'}>{currentOrderNumber}</p>
                    <p className="text text_type_main-medium">Идентификатор заказа</p>
                    <img className='mb-15 mt-15' src={orderImage} alt='' />
                    <p className="text text_type_main-medium mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-medium text_color_inactive mb-30">Дождитесь готовности на
                        орбитальной
                        станции</p>
                </React.Fragment>
            )}
        </div>
    )
}

export default OrderDetails
