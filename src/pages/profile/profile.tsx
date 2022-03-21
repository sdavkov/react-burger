import React from 'react';
import styles from './profile.module.css'
import UserProfile from "../../components/user-profile/user-profile";
import { useDispatch } from "react-redux";
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import UserOrders from "../../components/user-orders/user-orders";
import { logoutUser } from '../../services/slices/auth';

export function ProfilePage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { path } = useRouteMatch();
    const location = useLocation();

    function logoutHandler() {
        dispatch(logoutUser());
        history.replace('/login');
    }

    return (
        <div className={styles.profile}>
            <div className={styles.nav}>
                <ul>
                    <li>
                        <p className={(location.pathname === path) ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive'}>
                            <Link style={{ color: "inherit" }} to={`${path}`}>Профиль</Link></p>
                    </li>
                    <li>
                        <p className={(location.pathname === `${path}/orders`) ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive'}>
                            <Link style={{ color: "inherit" }} to={`${path}/orders`}>История заказов</Link></p>
                    </li>
                    <li>
                        <a className={styles.logout + " text text_type_main-medium text_color_inactive"} href="/"
                            onClick={logoutHandler}>Выход</a>
                    </li>
                </ul>
                <Switch>
                    <Route path={`${path}`} exact={true}>
                        <p className="text text_type_main-default text_color_inactive mt-20">
                            В этом разделе вы можете изменить свои персональные данные</p>
                    </Route>
                    <Route path={`${path}/orders`} exact={true}>
                        <p className="text text_type_main-default text_color_inactive mt-20">
                            В этом разделе вы можете просмотреть свою историю заказов</p>
                    </Route>
                </Switch>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path={`${path}`} exact={true}>
                        <UserProfile />
                    </Route>
                    <Route path={`${path}/orders`} exact={true}>
                        <UserOrders />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}