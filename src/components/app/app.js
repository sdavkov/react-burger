import React, {useCallback, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css'
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_CURRENT_BURGER_INGREDIENT, getBurgerIngredients} from "../../services/actions/burger-ingredients";
import {CLEAR_CURRENT_ORDER_NUMBER} from "../../services/actions/burger-constructor";

const App = React.memo(() => {

    const {burgerIngredientsRequest, burgerIngredientsRequestFailed, currentBurgerIngredient, currentOrderNumber} = useSelector(store => ({
        burgerIngredientsRequest: store.burgerIngredients.burgerIngredientsRequest,
        burgerIngredientsRequestFailed: store.burgerIngredients.burgerIngredientsRequestFailed,
        currentBurgerIngredient: store.burgerIngredients.currentBurgerIngredient,
        currentOrderNumber: store.burgerConstructor.currentOrderNumber,
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBurgerIngredients())
    }, [dispatch])

    const clearCurrentIngredient = useCallback(() => {
        dispatch({type: CLEAR_CURRENT_BURGER_INGREDIENT})
    }, [dispatch]);

    const clearCurrentOrder = useCallback(() => {
        dispatch({type: CLEAR_CURRENT_ORDER_NUMBER});
    }, [dispatch])

    return (
        <>
            <AppHeader/>
            <div className='container'>
                {burgerIngredientsRequest ? (
                        <p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
                    burgerIngredientsRequestFailed ? (
                            <p className={styles.error + ' text text_type_main-medium'}>Ошибка загрузки ингредиентов</p>) :
                        (<main className={styles.row}>
                            <BurgerIngredients/>
                            {currentBurgerIngredient && (
                                <Modal closeModal={clearCurrentIngredient}>
                                    <IngredientDetails/>
                                </Modal>)}
                            <div className="pl-10">&nbsp;</div>
                            <BurgerConstructor/>
                            {currentOrderNumber && (
                                <Modal closeModal={clearCurrentOrder}>
                                    <OrderDetails/>
                                </Modal>
                            )}
                        </main>)
                }
            </div>
        </>
    );
});

export default App;
