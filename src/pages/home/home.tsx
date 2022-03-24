import React from 'react';
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useAppSelector } from '../../services/store';


export function HomePage() {

    const {
        burgerIngredientsRequest,
        burgerIngredientsRequestFailed,

    } = useAppSelector(state => (state.burgerIngredients));

    return (
        <React.Fragment>
            {burgerIngredientsRequest ? (
                <p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
                burgerIngredientsRequestFailed ? (
                    <p className={styles.error + ' text text_type_main-medium'}>Ошибка загрузки ингредиентов</p>) :
                    (<main className={styles.row}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <div className="pl-10">&nbsp;</div>
                            <BurgerConstructor />
                        </DndProvider>
                    </main>)
            }
        </React.Fragment>
    );
}