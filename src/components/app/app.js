import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css'
import { BurgerConstructorContext } from '../../services/burger-constructor-context.js';
import { burgerConstructorReducer, clearOrderAction, initialBurgerConstructorState, setBurgerConstructorAction } from '../../services/burger-constructor-reducer';
import { useFetching } from '../../hooks/useFetching';
import IngredientsService from '../../api/ingredients-service';
import { createRandomBurgerConstructor } from '../../utils/burger-constructor-utils';

const App = React.memo(() => {

  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetail, setVisibleIngredientDetail] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const [burgerConstructorState, dispatchBurgerConstructor] = useReducer(burgerConstructorReducer, initialBurgerConstructorState);
  const contextProviderValue = useMemo(() => [burgerConstructorState, dispatchBurgerConstructor], [burgerConstructorState, dispatchBurgerConstructor]);

  const [fetchIngredients, isIngredientsLoading, igredientsError] = useFetching(async () => {
    const ingredients = await IngredientsService.fetchIngredients();
    setIngredients(ingredients);
  })

  useEffect(() => {
    //Получаем ингредиенты с сервера
    fetchIngredients();
  }, [])

  useEffect(() => {
    //Заполняем рандомно тестовые данные для отрисовки конструктора
    const result = createRandomBurgerConstructor(ingredients);
    result &&
      dispatchBurgerConstructor(setBurgerConstructorAction(result));
  }, [ingredients])

  const clearCurrentIngredient = useCallback(() => {
    setCurrentIngredient(null);
  }, [setCurrentIngredient]);

  const clearCurrentOrder = useCallback(() => {
    dispatchBurgerConstructor(clearOrderAction());
  }, [dispatchBurgerConstructor])

  return (
    <>
      <AppHeader />
      <>
        <div className='container'>
          {isIngredientsLoading ? (<p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
            igredientsError !== '' ? (<p className={styles.error + ' text text_type_main-medium'}>{igredientsError}</p>) :
              (<main className={styles.row}>
                <BurgerConstructorContext.Provider value={contextProviderValue}>
                  <BurgerIngredients burgerIngredients={ingredients} setCurrentIngredient={setCurrentIngredient} setVisibleIngredientDetail={setVisibleIngredientDetail} />
                  {currentIngredient && (
                    <Modal closeModal={clearCurrentIngredient} >
                      <IngredientDetails ingredient={currentIngredient} />
                    </Modal>)}
                  <div className="pl-10">&nbsp;</div>
                  <BurgerConstructor setVisibleOrderDetails={setVisibleOrderDetails} />
                  {burgerConstructorState.order && (
                    <Modal closeModal={clearCurrentOrder} >
                      <OrderDetails />
                    </Modal>
                  )}
                </BurgerConstructorContext.Provider>
              </main>)
          }
        </div>
      </>
    </>
  );
});

export default App;
