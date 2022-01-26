import React, { useMemo } from 'react'
import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalBurgerConstructor from '../total-burger-constructor/total-burger-constructor'
import {useDispatch, useSelector} from "react-redux";
import {removeCartItem} from "../../services/actions/burger-constructor";

const BurgerConstructor = React.memo(() => {

    const {cart} = useSelector(store => ({
        cart: store.burgerConstructor.cart
    }))

    const bun = useMemo(() => cart.find(cartItem => cartItem.burgerIngredient.type === 'bun'), [cart]);
    const additions = useMemo(() => cart.filter(cartItem => cartItem.burgerIngredient.type !== 'bun'), [cart]);

    const dispatch = useDispatch();

    return (
        <div className={styles.constructor + ' pt-25 pb-5 pr-4 pl-4'}>
            {cart.length > 0 && (
                <>
                    <div className={styles.list}>
                        {bun && (
                            <>
                                <div className={styles.item}>
                                    <div> </div>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={bun.burgerIngredient.name + ' (верх)'}
                                        price={bun.burgerIngredient.price}
                                        thumbnail={bun.burgerIngredient.image}
                                    />
                                </div>
                                <div className='pt-4'> </div>
                            </>
                        )}
                        <div className={styles.items + ' custom-scroll'}>
                            {additions.map((cartItem) => (
                                <React.Fragment key={cartItem.id}>
                                    <div className={styles.item + ' pt-4'}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            isLocked={false}
                                            text={cartItem.burgerIngredient.name}
                                            price={cartItem.burgerIngredient.price}
                                            thumbnail={cartItem.burgerIngredient.image}
                                            handleClose={() => dispatch(removeCartItem(cartItem))}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        {bun && (
                            <>
                                <div className='pt-4'> </div>
                                <div className={styles.item}>
                                    <div> </div>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={bun.burgerIngredient.name + ' (низ)'}
                                        price={bun.burgerIngredient.price}
                                        thumbnail={bun.burgerIngredient.image}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <TotalBurgerConstructor />
                </>
            )}
        </div >
    )
})

export default BurgerConstructor
