import React, { useEffect, useState } from 'react';
import { burgerIngridientsJSON, cartData } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = React.memo(() => {

  const [state, setState] = useState({
    ingredientsData: [],
    loading: false,
    error: ''
  })

  const [cart, setCart] = useState([])

  useEffect(() => {
    const getIngredientsData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setState({ ...state, ingredientsData: data.data, loading: false });
      }
      catch (e) {
        setState({ ...state, error: `Ошибка при загрузке данных: ${e}`, loading: false });
      }
    }
    getIngredientsData();
  }, [])

  useEffect(() => {
    //Заполняем тестовые данные для отрисовки конструктора
    if (state.ingredientsData.length > 0) {
      const bun = state.ingredientsData.find((item) => item.type === 'bun');
      const additionals = state.ingredientsData.filter(item => item.type !== 'bun');
      const result = [bun];
      for (let index = 0; index < 4; index++) {
        const i = Math.floor(Math.random() * additionals.length);
        result.push(additionals[i]);
      }
      setCart(result);
    }
  }, [state.ingredientsData])

  return (
    <>
      <AppHeader />
      <div className={styles.content}>
        <div className='container'>
          {state.loading ? (<p className={styles.loading + ' text text_type_main-medium'}>Загрузка ...</p>) :
            state.error !== '' ? (<p className={styles.error + ' text text_type_main-medium'}>{state.error}</p>) :
              (<div className={styles.row}>
                <>
                  <BurgerIngredients burgerIngredients={state.ingredientsData} cart={cart} />
                  {cart.length > 0 && <BurgerConstructor burgerIngredients={state.ingredientsData} cart={cart} />}
                </>
              </div>)
          }
        </div>
      </div>
      <footer className={styles.footer}>
      </footer>
    </>
  );
});

export default App;
