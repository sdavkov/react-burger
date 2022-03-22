import React, { FunctionComponent, useRef } from "react";
import styles from "./burger-constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { BURGER_INGREDIENT_BUN_TYPE } from "../../utils/constants";
import { removeCartItem } from '../../services/slices/burger-constructor';
import { TCart } from '../../services/types/data';
import { useAppDispatch } from '../../services/store';

interface IBurgerConstructorItem {
    cartItem: TCart;
    index?: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    topBun?: boolean;
    bottomBun?: boolean;
}

const BurgerConstructorItem: FunctionComponent<IBurgerConstructorItem> = ({ cartItem, index, moveCard, topBun = false, bottomBun = false }) => {

    const dispatch = useAppDispatch();
    const ref = useRef<HTMLParagraphElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        canDrop() {
            if (cartItem.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE)
                return false;
            else
                return true;
        },
        hover(item: { cartItem: TCart, index: number }, monitor) {
            if (!ref.current || !moveCard || !index) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Булки не учавствуют в сортировке
            if (cartItem.burgerIngredient.type === BURGER_INGREDIENT_BUN_TYPE) {
                return;
            }
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            if (clientOffset) {
                // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                // Time to actually perform the action
                moveCard(dragIndex, hoverIndex);
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                item.index = hoverIndex;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { cartItem, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={styles.item + ' pt-4'}>
            {(!topBun && !bottomBun) ? <DragIcon type="primary" /> : <div></div>}
            <ConstructorElement
                isLocked={topBun || bottomBun}
                type={topBun ? 'top' : bottomBun ? 'bottom' : undefined}
                text={cartItem.burgerIngredient.name + (topBun ? ' (верх)' : bottomBun ? ' (низ)' : '')}
                price={cartItem.burgerIngredient.price}
                thumbnail={cartItem.burgerIngredient.image}
                handleClose={() => dispatch(removeCartItem(cartItem))}
            />
        </div>
    )
}

export default BurgerConstructorItem