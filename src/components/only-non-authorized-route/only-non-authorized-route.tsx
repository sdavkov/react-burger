import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { ILocationState } from '../../utils/ts-types';
import { getUser } from '../../services/slices/auth';

const OnlyNonAuthorizedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {

    const { state } = useLocation<ILocationState>()
    const { currentUser, authRequest } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        currentUser == null && dispatch(getUser())
    }, [currentUser, dispatch]);

    if (authRequest) {
        return null;
    }

    if (currentUser) {
        return (
            <Redirect
                to={state?.from || '/'
                }
            />
        );
    }

    return (
        <Route
            {...rest}
            render={() => (children)
            }
        />
    );
}

export default OnlyNonAuthorizedRoute;