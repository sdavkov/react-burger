import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorContext } from '../../services/burger-constructor-context'
import TotalBurgerConstructor from '../total-burger-constructor/total-burger-constructor'
import { removeBurgerConstructorAction } from '../../services/burger-constructor-reducer'

const BurgerConstructor = React.memo(({ setVisibleOrderDetails }) => {

    const [burgerConstructorState, dispatchBurgerConstructor] = useContext(BurgerConstructorContext)

    const bun = useMemo(() => burgerConstructorState.cart.find(cartItem => cartItem.ingredient.type == 'bun'), [burgerConstructorState]);
    const additionals = useMemo(() => burgerConstructorState.cart.filter(cartItem => cartItem.ingredient.type !== 'bun'), [burgerConstructorState]);

    return (
        <div className={styles.constructor + ' pt-25 pb-5 pr-4 pl-4'}>
            {burgerConstructorState.cart.length > 0 && (
                <>
                    <div className={styles.list}>
                        {bun && (
                            <>
                                <div className={styles.item}>
                                    <div></div>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={bun.ingredient.name + ' (верх)'}
                                        price={bun.ingredient.price}
                                        thumbnail={bun.ingredient.image}
                                    />
                                </div>
                                <div className='pt-4'></div>
                            </>
                        )}
                        <div className={styles.items + ' custom-scroll'}>
                            {additionals.map((cartItem) => (
                                <React.Fragment key={cartItem.cart_id}>
                                    <div className={styles.item + ' pt-4'}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            isLocked={false}
                                            text={cartItem.ingredient.name}
                                            price={cartItem.ingredient.price}
                                            thumbnail={cartItem.ingredient.image}
                                            handleClose={() => { dispatchBurgerConstructor(removeBurgerConstructorAction(cartItem)) }}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        {bun && (
                            <>
                                <div className='pt-4'></div>
                                <div className={styles.item}>
                                    <div></div>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={bun.ingredient.name + ' (низ)'}
                                        price={bun.ingredient.price}
                                        thumbnail={bun.ingredient.image}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <TotalBurgerConstructor setVisibleOrderDetails={setVisibleOrderDetails} />
                </>
            )}
        </div >
    )
})

BurgerConstructor.propTypes = {
    setVisibleOrderDetails: PropTypes.func.isRequired,
}

export default BurgerConstructor
