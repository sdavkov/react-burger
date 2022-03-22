import React, { FunctionComponent, LegacyRef, RefObject } from 'react'
import styles from './burger-ingredients-items.module.css'
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import { useAppSelector } from '../../services/store';

interface IBurgerIngredientsItemsProps {
    title: string;
    type: string;
    ref: RefObject<HTMLParagraphElement>;
}

const BurgerIngredientsItems: FunctionComponent<IBurgerIngredientsItemsProps> = React.memo(React.forwardRef(({ title, type }, ref) => {

    const burgerIngredients = useAppSelector((state) => state.burgerIngredients.burgerIngredients);

    return (
        <>
            <p ref={ref as LegacyRef<HTMLParagraphElement>} className='text text_type_main-medium pt-10'>{title}</p>
            <div className={styles.items + ' mb-10'}>
                {burgerIngredients.filter(i => i.type === type).map(item => (
                    <BurgerIngredientItem key={item._id} burgerIngredient={item} />
                ))}
            </div>
        </>
    )
}))

export default BurgerIngredientsItems
