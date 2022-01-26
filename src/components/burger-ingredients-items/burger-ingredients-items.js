import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients-items.module.css'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from "react-redux";
import {SET_CURRENT_BURGER_INGREDIENT} from "../../services/actions/burger-ingredients";
import {addCartItem} from "../../services/actions/burger-constructor";

const BurgerIngredientsItems = React.memo(React.forwardRef(({title, type}, ref) => {

    const {burgerIngredients, cart} = useSelector(store => ({
        burgerIngredients: store.burgerIngredients.burgerIngredients,
        cart: store.burgerConstructor.cart
    }));

    const dispatch = useDispatch();

    const showModal = (ingredient) => {
        dispatch({type: SET_CURRENT_BURGER_INGREDIENT, payload: ingredient});
        dispatch(addCartItem(ingredient));
    }

    return (
        <>
            <p ref={ref} className='text text_type_main-medium pt-10'>{title}</p>
            <div className={styles.items + ' mb-10'}>
                {burgerIngredients.filter(i => i.type === type).map(item => (
                    <div className={styles.item} key={item._id} onClick={() => showModal(item)}>
                        <div className={styles.image + ' ml-4 mr-4 pb-1'}>
                            {cart.find(cartItem => cartItem._id === item._id) && <Counter
                                count={cart.filter(cartItem => cartItem._id === item._id).length}
                                size="default"/>}
                            <img src={item.image} alt=''/>
                        </div>
                        <div className={styles.price + ' pb-1'}><p
                            className="text text_type_digits-default mr-1">{item.price}</p><CurrencyIcon
                            type="primary"/></div>
                        <p className={styles.name + ' text text_type_main-default'}>{item.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}))

BurgerIngredientsItems.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}
export default BurgerIngredientsItems
