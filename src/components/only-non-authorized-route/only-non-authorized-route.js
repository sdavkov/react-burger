import React, {useEffect, useState} from 'react';
import {Redirect, Route, useLocation} from "react-router-dom";
import {getUser} from "../../services/actions/auth";
import useAuth from "../../hooks/useAuth";
import {useDispatch} from "react-redux";

function OnlyNonAuthorizedRoute({children, ...rest}) {

    const {state} = useLocation()
    const {currentUser, authRequest} = useAuth();
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
                to={state?.from || '/'}
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