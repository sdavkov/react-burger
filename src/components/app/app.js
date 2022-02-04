import React, {useCallback, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage} from "../../pages";

function App() {
    return (
        <React.Fragment>
            <AppHeader/>
            <div className='container'>
                <Router>
                    <Switch>
                        <Route path="/" exact={true}>
                            <HomePage/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <LoginPage/>
                        </Route>
                        <Route path="/register" exact={true}>
                            <RegisterPage/>
                        </Route>
                        <Route path="/forgot-password" exact={true}>
                            <ForgotPasswordPage/>
                        </Route>
                        <Route path="/reset-password">
                            <ResetPasswordPage/>
                        </Route>
                        <Route path="/profile">
                            <ProfilePage/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    )
};

export default App;
