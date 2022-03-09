import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { getUser } from '../../services/slices/auth';

const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {

    const { currentUser, authRequest } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        currentUser == null && dispatch(getUser())
    }, [currentUser, dispatch]);

    if (authRequest) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser ?
                    (children
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: location }
                        }} />)
            }
        />
    );
}

export default ProtectedRoute;