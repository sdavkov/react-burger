import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { closedWSConnection, startWSConnection } from '../../services/slices/web-socket';
import { AppDispatch, RootState } from '../../services/types';
import { ACCESS_TOKEN_NAME, WSS_PERSONALS_ORDERS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';
import OrderItem from '../order-item/order-item';
import styles from './user-orders.module.css'


function UserOrders() {

    const { currentUser } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.webSocket.orders);

    const location = useLocation();
    const history = useHistory();

    const onClickHandler = (order_id: string) => {
        history.push(`/profile/orders/${order_id}`, { background: location });
    }

    useEffect(
        () => {
            dispatch(startWSConnection(`${WSS_PERSONALS_ORDERS_URL}?token=${getCookie(ACCESS_TOKEN_NAME)}`));
            return () => { dispatch(closedWSConnection()) }
        },
        [dispatch, currentUser]
    );

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