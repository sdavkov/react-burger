import React, { FunctionComponent } from 'react'
import styles from "./burger-ingredient-item.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { burgerIngredientPropTypes } from "../../utils/types";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IBurgerIngredient } from '../../utils/ts-types';
import { RootState } from '../../services/store';

interface IBurgerIngredientItemProps {
    burgerIngredient: IBurgerIngredient;
}

const BurgerIngredientItem: FunctionComponent<IBurgerIngredientItemProps> = ({ burgerIngredient }) => {

    const location = useLocation();
    const history = useHistory();

    const cart = useSelector((store: RootState) => store.burgerConstructor.cart);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: burgerIngredient
    });

    const onClickHandler = () => {
        history.push(`/ingredients/${burgerIngredient._id}`, { background: location })
    }

    return (
        <div ref={dragRef} className={styles.item} key={burgerIngredient._id} onClick={onClickHandler}>
            <div className={styles.image + ' ml-4 mr-4 pb-1'}>
                {cart.find(cartItem => cartItem.burgerIngredient._id === burgerIngredient._id) && <Counter
                    count={cart.filter(cartItem => cartItem.burgerIngredient._id === burgerIngredient._id).length}
                    size="default" />}
                <img src={burgerIngredient.image} alt='' />
            </div>
            <div className={styles.price + ' pb-1'}><p
                className="text text_type_digits-default mr-1">{burgerIngredient.price}</p><CurrencyIcon
                    type="primary" /></div>
            <p className={styles.name + ' text text_type_main-default'}>{burgerIngredient.name}</p>
        </div>
    )
}

BurgerIngredientItem.propTypes = {
    burgerIngredient: burgerIngredientPropTypes.isRequired,
}

export default BurgerIngredientItem