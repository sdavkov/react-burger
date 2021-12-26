import React from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerIngredientsPropTypes, cartPropTypes } from '../../utils/ptop-types'

const getTotal = (burgerIngredients, cart) => {
    return cart.reduce((total, item) => total + burgerIngredients.find(ingredient => ingredient._id === item._id).price, 0)
}

const BurgerConstructor = ({ burgerIngredients, cart }) => {

    const bun = burgerIngredients.find(item => item._id === cart.find(cartItem => cartItem.type == 'bun')._id)

    return (
        <div className={styles.constructor + ' mt-25'}>
            {bun && (
                <div className={styles.item + ' mr-4'}>
                    <div></div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}
            <div className={styles.items}>
                {cart.filter(cartItem => cartItem.type !== 'bun').map((cartItem, index) => (
                    <div key={index} className={styles.item + ' mr-2'}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={burgerIngredients.find(item => item._id === cartItem._id).name}
                            price={burgerIngredients.find(item => item._id === cartItem._id).price}
                            thumbnail={burgerIngredients.find(item => item._id === cartItem._id).image}
                        />
                    </div>
                ))}
            </div>
            {bun && (
                <div className={styles.item + ' mr-4'}>
                    <div></div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}
            <div className={styles.total + ' mt-10 mb-10 mr-4'}>
                <div className={styles.sum + ' mr-10'}>
                    <p className="text text_type_digits-medium mr-2">{getTotal(burgerIngredients, cart)}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div >
    )
}

BurgerConstructor.propTypes = {
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart: PropTypes.arrayOf(cartPropTypes).isRequired,
}

export default BurgerConstructor
