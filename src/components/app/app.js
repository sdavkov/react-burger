import React, { useEffect, useReducer, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css'
import { BurgerConstructorContext } from '../../context/burger-constructor-context.js';
import { burgerConstructorReducer, initialBurgerConstructorState, setBurgerConstructorAction } from '../../context/burger-constructor-reducer';
import { useFetching } from '../../hooks/useFetching';
import IngredientsService from '../../api/ingredients-service';
import { randomIngredients } from '../../utils/random-ingredients';

const App = React.memo(() => {

  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleIngredientDetail, setVisibleIngredientDetail] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const [burgerConstructorState, dispatchBurgerConstructor] = useReducer(burgerConstructorReducer, initialBurgerConstructorState)

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
    const result = randomIngredients(ingredients);
    result &&
      dispatchBurgerConstructor(setBurgerConstructorAction(result));
  }, [ingredients])

  return (
    <>
      <AppHeader />
      <>
        <div className='container'>
          {isIngredientsLoading ? (<p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
            igredientsError !== '' ? (<p className={styles.error + ' text text_type_main-medium'}>{igredientsError}</p>) :
              (<main className={styles.row}>
                <BurgerConstructorContext.Provider value={[burgerConstructorState, dispatchBurgerConstructor]}>
                  <BurgerIngredients burgerIngredients={ingredients} setCurrentIngredient={setCurrentIngredient} setVisibleIngredientDetail={setVisibleIngredientDetail} />
                  {currentIngredient && (
                    <Modal visible={visibleIngredientDetail} setVisible={setVisibleIngredientDetail} >
                      <IngredientDetails ingredient={currentIngredient} />
                    </Modal>)}
                  <div className="pl-10">&nbsp;</div>
                  <BurgerConstructor burgerIngredients={ingredients} setVisibleOrderDetails={setVisibleOrderDetails} />
                  <Modal visible={visibleOrderDetails} setVisible={setVisibleOrderDetails} >
                    <OrderDetails />
                  </Modal>
                </BurgerConstructorContext.Provider>
              </main>)
          }
        </div>
      </>
    </>
  );
});

export default App;
