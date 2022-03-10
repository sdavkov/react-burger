import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
    Error404,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from "../../pages";
import ProtectedRoute from "../protected-route/protected-route";
import OnlyNonAuthorizedRoute from "../only-non-authorized-route/only-non-authorized-route";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { ILocationState } from '../../utils/common-types';
import { AppDispatch } from '../../services/types';
import { clearCurrentOrderNumberAction } from '../../services/slices/burger-constructor';
import { clearBurgerIngredientAction, fetchBurgerIngredients } from '../../services/slices/burger-ingredients';

function App() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() =>
        //@ts-ignore
        dispatch(fetchBurgerIngredients()),
        [dispatch])

    const ModalSwitch = () => {
        const location = useLocation<ILocationState>();
        const history = useHistory();
        let background = location.state && location.state.background;

        const dispatch = useDispatch();

        const handleIngredientModalClose = () => {
            dispatch(clearBurgerIngredientAction())
            history.goBack();
        };

        const handleNewOrderModalClose = () => {
            dispatch(clearCurrentOrderNumberAction());
            history.goBack();
        };

        return (
            <React.Fragment>
                <AppHeader />
                <div className='container'>
                    <Switch location={background || location}>
                        <Route path="/" exact={true}>
                            <HomePage />
                        </Route>
                        <OnlyNonAuthorizedRoute path="/login" exact={true}>
                            <LoginPage />
                        </OnlyNonAuthorizedRoute>
                        <OnlyNonAuthorizedRoute path="/register" exact={true}>
                            <RegisterPage />
                        </OnlyNonAuthorizedRoute>
                        <OnlyNonAuthorizedRoute path="/forgot-password" exact={true}>
                            <ForgotPasswordPage />
                        </OnlyNonAuthorizedRoute>
                        <OnlyNonAuthorizedRoute path="/reset-password">
                            <ResetPasswordPage />
                        </OnlyNonAuthorizedRoute>
                        <ProtectedRoute path="/profile">
                            <ProfilePage />
                        </ProtectedRoute>
                        <ProtectedRoute
                            path='/create-new-order'
                            children={
                                <Modal onClose={handleNewOrderModalClose}>
                                    <OrderDetails />
                                </Modal>
                            }
                        />
                        <Route path='/ingredients/:ingredientId' exact>
                            <IngredientDetails />
                        </Route>
                        <Route>
                            <Error404 />
                        </Route>
                    </Switch>
                    {background && (
                        <Route
                            path='/ingredients/:ingredientId'
                            children={
                                <Modal onClose={handleIngredientModalClose}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    )}
                </div>
            </React.Fragment>
        )
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;