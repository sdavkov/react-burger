import React, { FunctionComponent, useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ILocationState } from '../../utils/common-types';
import { getUser } from '../../services/slices/auth';
import { useAppDispatch } from '../../services/store';

const OnlyNonAuthorizedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {

    const { state } = useLocation<ILocationState>()
    const { currentUser, authRequest } = useAuth();
    const dispatch = useAppDispatch();

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