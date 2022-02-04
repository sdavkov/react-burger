import React, {useCallback, useEffect} from 'react';
import styles from "./home.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_CURRENT_BURGER_INGREDIENT, getBurgerIngredients} from "../../services/actions/burger-ingredients";
import {CLEAR_CURRENT_ORDER_NUMBER} from "../../services/actions/burger-constructor";

export function HomePage(props) {

    const {
        burgerIngredientsRequest,
        burgerIngredientsRequestFailed,
        currentBurgerIngredient,
        currentOrderNumber
    } = useSelector(store => ({
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
        <React.Fragment>
            {burgerIngredientsRequest ? (
                    <p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
                burgerIngredientsRequestFailed ? (
                        <p className={styles.error + ' text text_type_main-medium'}>Ошибка загрузки ингредиентов</p>) :
                    (<main className={styles.row}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <div className="pl-10">&nbsp;</div>
                            <BurgerConstructor/>
                        </DndProvider>
                        {currentBurgerIngredient && (
                            <Modal closeModal={clearCurrentIngredient}>
                                <IngredientDetails/>
                            </Modal>)}
                        {currentOrderNumber && (
                            <Modal closeModal={clearCurrentOrder}>
                                <OrderDetails/>
                            </Modal>
                        )}
                    </main>)
            }
        </React.Fragment>
    );
}