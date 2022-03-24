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
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../create-order/create-order";
import { ILocationState } from '../../utils/common-types';
import { clearCurrentOrderNumberAction } from '../../services/slices/burger-constructor';
import { clearBurgerIngredientAction, fetchBurgerIngredients } from '../../services/slices/burger-ingredients';
import FeedPage from '../../pages/feed-orders/feed-orders';
import OrderDetail from '../order-detail/order-detail';
import DetailPage from '../../pages/detail-page/detail-page';
import { useAppDispatch } from '../../services/store';

function App() {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchBurgerIngredients());
    },
        [dispatch])

    const ModalSwitch = () => {
        const location = useLocation<ILocationState>();
        const history = useHistory();
        let background = location.state && location.state.background;

        const dispatch = useAppDispatch();

        const handleIngredientModalClose = () => {
            dispatch(clearBurgerIngredientAction())
            history.goBack();
        };

        const handleNewOrderModalClose = () => {
            dispatch(clearCurrentOrderNumberAction());
            history.goBack();
        };

        const handleOrderDetailModalClose = () => {
            history.goBack();
        }

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
                        <Route path="/feed" exact={true}>
                            <FeedPage />
                        </Route>
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
                        <Route
                            path='/ingredients/:ingredientId'
                            exact
                            children={
                                <DetailPage>
                                    <IngredientDetails />
                                </DetailPage>
                            }
                        />
                        <Route
                            path='/feed/:id'
                            exact
                            children={
                                <DetailPage>
                                    <OrderDetail />
                                </DetailPage>
                            }
                        />
                        <Route>
                            <Error404 />
                        </Route>
                    </Switch>
                    {background && (
                        <Switch>
                            <Route
                                path='/ingredients/:ingredientId'
                                children={
                                    <Modal onClose={handleIngredientModalClose}>
                                        <IngredientDetails />
                                    </Modal>
                                }
                            />
                            <Route
                                path='/feed/:id'
                                exact
                                children={
                                    <Modal onClose={handleOrderDetailModalClose}>
                                        <OrderDetail />
                                    </Modal>
                                }
                            />
                            <ProtectedRoute
                                path='/profile/orders/:id'
                                exact
                                children={
                                    <Modal onClose={handleOrderDetailModalClose}>
                                        <OrderDetail />
                                    </Modal>
                                }
                            />
                        </Switch>
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
