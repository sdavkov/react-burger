import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getUser } from '../../services/slices/auth';
import { useAppDispatch } from '../../services/store';

const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {

    const { currentUser, authRequest } = useAuth();
    const dispatch = useAppDispatch();

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