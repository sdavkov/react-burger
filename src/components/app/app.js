import React from 'react';
import { burgerIngridientsJSON, cartData } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css'

function App() {

  const burgerIngredients = JSON.parse(burgerIngridientsJSON)
  const cart = cartData

  return (
    <>
      <AppHeader />
      <div className={styles.content}>
        <div className='container'>
          <div className={styles.row}>
            <BurgerIngredients burgerIngredients={burgerIngredients} cart={cart} />
            <BurgerConstructor burgerIngredients={burgerIngredients} cart={cart} />
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
      </footer>
    </>
  );
}

export default App;
