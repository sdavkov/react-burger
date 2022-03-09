import React, { FC, useCallback, useMemo } from 'react'
import styles from './burger-constructor.module.css'
import TotalBurgerConstructor from '../total-burger-constructor/total-burger-constructor'
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { BURGER_INGREDIENT_BUN_TYPE } from "../../utils/constants";
import { IBurgerIngredient } from '../../utils/ts-types';
import { AppDispatch, RootState } from '../../services/types';
import { addCartItem, moveCartItem } from '../../services/slices/burger-constructor';


const BurgerConstructor: FC = React.memo(() => {

    const cart = useSelector((state: RootState) => state.burgerConstructor.cart);

    const bun = useMemo(() => cart.find(cartItem => cartItem.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE), [cart]);
    const additions = useMemo(() => cart.filter(cartItem => cartItem.burgerIngredient.type !== BURGER_INGREDIENT_BUN_TYPE), [cart]);

    const dispatch = useDispatch<AppDispatch>();

    const [{ isHover, canDrop }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(burgerIngredient: IBurgerIngredient) {
            dispatch(addCartItem(burgerIngredient))
        },
        canDrop(burgerIngredient) {
            if (bun || burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE)
                return true;
            else
                return false;
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    const canDropDecoratorCssClass = cart.length === 0 ? (isHover ? (canDrop ? styles.allowDrop : styles.disableDrop) : '') : '';

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveCartItem({ dragIndex, hoverIndex }));
    }, [dispatch]);

    return (
        <div className={`${styles.constructor} pt-25 pb-5 pr-4 pl-4`}>
            <>
                <div className={`${styles.list} ${canDropDecoratorCssClass}`} ref={dropTarget}>
                    {bun && (
                        <>
                            <BurgerConstructorItem cartItem={bun} topBun={true} />
                            <div className='pt-4'></div>
                            <div className={styles.items + ' custom-scroll'}>
                                {additions.map((cartItem, index) => (
                                    <BurgerConstructorItem key={cartItem.id} index={index} moveCard={moveCard}
                                        cartItem={cartItem} />
                                ))}
                            </div>
                            <BurgerConstructorItem cartItem={bun} bottomBun={true} />
                        </>
                    )}
                </div>
                {bun && (
                    <TotalBurgerConstructor />
                )}
            </>
        </div>
    )
})

export default BurgerConstructor
