import React from 'react';
import styles from './profile.module.css'
import UserProfile from "../../components/user-profile/user-profile";
import { useDispatch } from "react-redux";
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import Orders from "../../components/orders/orders";
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
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route path={`${path}`} exact={true}>
                        <UserProfile />
                    </Route>
                    <Route path={`${path}/orders`} exact={true}>
                        <Orders />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}