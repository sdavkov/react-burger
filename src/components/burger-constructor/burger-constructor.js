import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerIngredientsPropTypes } from '../../utils/ptop-types'
import OrderDetails from '../order-details/order-details'

const getTotal = (burgerIngredients, cart) => {
    return cart.reduce((total, item) => total + burgerIngredients.find(ingredient => ingredient._id === item._id).price, 0)
}

const BurgerConstructor = React.memo(({ burgerIngredients, cart }) => {

    const [visibleModal, setVisibleModal] = useState(false);

    const bun = cart.find(cartItem => cartItem.type == 'bun')

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
            <div className={styles.items + ' custom-scroll'}>
                {cart.filter(cartItem => cartItem.type !== 'bun').map((cartItem, index) => (
                    <div key={index} className={styles.item + ' mr-4'}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={cartItem.name}
                            price={cartItem.price}
                            thumbnail={cartItem.image}
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
                <OrderDetails visible={visibleModal} setVisible={setVisibleModal} />
                <Button type="primary" size="large" onClick={() => setVisibleModal(true)}>
                    Оформить заказ
                </Button>
            </div>
        </div >
    )
})

BurgerConstructor.propTypes = {
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    cart: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
}

export default BurgerConstructor
