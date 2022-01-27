import React, {useRef} from "react";
import PropTypes from 'prop-types'
import styles from "./burger-constructor-item.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeCartItem} from "../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorItem = ({cartItem, index, moveCard, topBun = false, bottomBun = false}) => {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        canDrop() {
            if (cartItem.burgerIngredient.type === 'bun')
                return false;
            else
                return true;
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Булки не учавствуют в сортировке
            if (cartItem.burgerIngredient.type === 'bun') {
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
            {(!topBun && !bottomBun) ? <DragIcon type="primary"/> : <div></div>}
            <ConstructorElement
                isLocked={topBun || bottomBun}
                type={topBun ? 'top' : bottomBun ? 'bottom' : ''}
                text={cartItem.burgerIngredient.name + (topBun ? ' (верх)' : bottomBun ? ' (низ)' : '')}
                price={cartItem.burgerIngredient.price}
                thumbnail={cartItem.burgerIngredient.image}
                handleClose={() => dispatch(removeCartItem(cartItem))}
            />
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    cartItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        burgerIngredient: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        })
    }).isRequired,
    index: PropTypes.number,
    moveCard: PropTypes.func,
    topBun: PropTypes.bool,
    bottomBun: PropTypes.bool,
}

export default BurgerConstructorItem