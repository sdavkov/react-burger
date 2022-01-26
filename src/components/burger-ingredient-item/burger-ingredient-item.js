import React from 'react'
import PropTypes from 'prop-types'
import styles from "./burger-ingredient-item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {SET_CURRENT_BURGER_INGREDIENT} from "../../services/actions/burger-ingredients";
import {useDrag} from "react-dnd";


const BurgerIngredientItem = ({burgerIngredient}) => {

    const dispatch = useDispatch();

    const cart = useSelector(store => store.burgerConstructor.cart);

    const showModal = (burgerIngredient) => {
        dispatch({type: SET_CURRENT_BURGER_INGREDIENT, payload: burgerIngredient});
    }

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: burgerIngredient
    });

    return (
        <div ref={dragRef} className={styles.item} key={burgerIngredient._id} onClick={() => showModal(burgerIngredient)}>
            <div className={styles.image + ' ml-4 mr-4 pb-1'}>
                {cart.find(cartItem => cartItem.burgerIngredient._id === burgerIngredient._id) && <Counter
                    count={cart.filter(cartItem => cartItem.burgerIngredient._id === burgerIngredient._id).length}
                    size="default"/>}
                <img src={burgerIngredient.image} alt=''/>
            </div>
            <div className={styles.price + ' pb-1'}><p
                className="text text_type_digits-default mr-1">{burgerIngredient.price}</p><CurrencyIcon
                type="primary"/></div>
            <p className={styles.name + ' text text_type_main-default'}>{burgerIngredient.name}</p>
        </div>
    )
}

BurgerIngredientItem.propTypes = {
    burgerIngredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }),
}

export default BurgerIngredientItem