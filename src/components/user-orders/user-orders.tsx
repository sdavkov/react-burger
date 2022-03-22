import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useWebSocket from '../../hooks/useWebSocket';
import { useAppSelector } from '../../services/store';
import OrderItem from '../order-item/order-item';
import styles from './user-orders.module.css'


function UserOrders() {

    useWebSocket();
    const orders = useAppSelector(state => state.webSocket.orders);

    const location = useLocation();
    const history = useHistory();

    const onClickHandler = (order_id: string) => {
        history.push(`/profile/orders/${order_id}`, { background: location });
    }

    return (
        <>
            {orders && (
                <div className={styles.orders + ' custom-scroll pr-2'}>
                    {orders.map((order) => (<OrderItem key={order._id} onClickHandler={onClickHandler} order={order} />))}
                </div>
            )}
        </>
    );
}

export default UserOrders;