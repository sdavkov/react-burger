import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients-items.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerIngredientsPropTypes } from '../../utils/ptop-types'
import IngredientDetails from '../ingredient-details/ingredient-details'

const BurgerIngredientsItems = React.memo(React.forwardRef(({ title, burgerIngredients, cart }, ref) => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const showModal = (ingredient) => {
        setCurrentIngredient(ingredient);
        setVisibleModal(true);
    }

    return (
        <>
            {currentIngredient && <IngredientDetails visible={visibleModal} setVisible={setVisibleModal} ingredient={currentIngredient} />}
            <p ref={ref} className='text text_type_main-medium pt-10'>{title}</p>
            <div className={styles.items + ' pt-6 pb-10 pl-4'}>
                {burgerIngredients.map(item => (
                    <div className={styles.item + ' pr-6'} key={item._id} onClick={() => showModal(item)}>
                        <div className={styles.image + ' ml-4 mr-4 pb-1'}>
                            {cart && cart.find(cartItem => cartItem._id === item._id) && <p className={styles.count + ' text text_type_digits-default'}>{cart.filter(cartItem => cartItem._id === item._id).length}</p>}
                            <img src={item.image} />
                        </div>
                        <div className={styles.price + ' pb-1'}><p className="text text_type_digits-default mr-1">{item.price}</p><CurrencyIcon type="primary" /></div>
                        <p className={styles.name + ' text text_type_main-default'}>{item.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}))

BurgerIngredientsItems.propTypes = {
    title: PropTypes.string.isRequired,
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
}
export default BurgerIngredientsItems
