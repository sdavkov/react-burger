import React, {useEffect, useState} from 'react';
import {Redirect, Route} from "react-router-dom";
import {getUser} from "../../services/actions/auth";
import useAuth from "../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";

function ProtectedRoute({children, ...rest}) {

    const {currentUser, authRequest} = useAuth();
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
            render={({location}) =>
                currentUser ?
                    (children
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: {from: location}
                        }}/>)
            }
        />
    );
}

export default ProtectedRoute;