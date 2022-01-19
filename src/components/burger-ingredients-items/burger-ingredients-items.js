import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients-items.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { burgerIngredientsPropTypes } from '../../utils/ptop-types'
import { BurgerConstructorContext } from '../../services/burger-constructor-context'

const BurgerIngredientsItems = React.memo(React.forwardRef(({ title, burgerIngredients, setVisibleIngredientDetail, setCurrentIngredient }, ref) => {

    const [burgerConstructorState] = useContext(BurgerConstructorContext)

    const showModal = (ingredient) => {
        setCurrentIngredient(ingredient);
        setVisibleIngredientDetail(true);
    }

    return (
        <>
            <p ref={ref} className='text text_type_main-medium pt-10'>{title}</p>
            <div className={styles.items + ' mb-10'}>
                {burgerIngredients.map(item => (
                    <div className={styles.item} key={item._id} onClick={() => showModal(item)}>
                        <div className={styles.image + ' ml-4 mr-4 pb-1'}>
                            {burgerConstructorState.cart.find(cartItem => cartItem._id === item._id) && <Counter count={burgerConstructorState.cart.filter(cartItem => cartItem._id === item._id).length} size="default" />}
                            <img src={item.image} />
                        </div>
                        <div className={styles.price + ' pb-1'}><p className="text text_type_digits-default mr-1">{item.price}</p><CurrencyIcon type="primary" /></div>
                        <p className={styles.name + ' text text_type_main-default'}>{item.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}))

BurgerIngredientsItems.propTypes = {
    title: PropTypes.string.isRequired,
    burgerIngredients: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    setVisibleIngredientDetail: PropTypes.func,
    setCurrentIngredient: PropTypes.func
}
export default BurgerIngredientsItems
