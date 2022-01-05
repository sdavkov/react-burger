import React from 'react'
import Modal from '../modal/modal'
import styles from './ingredient-details.module.css'

const IngredientDetails = ({ ingredient, visible, setVisible }) => {
    return (
        <Modal title='Детали ингредиента' visible={visible} setVisible={setVisible}>
            {ingredient && (
                <div className={styles.ingredient}>
                    <img className={styles.image + ' mb-4'} src={ingredient.image_large} />
                    <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
                    <div className={styles.analyzes + ' text_color_inactive mb-15'}>
                        <div className={styles.analysis + ' mr-5'}>
                            <p className='text text_type_main-default mb-3'>Каллории, ккал</p>
                            <p className='text text_type_digits-default'>{ingredient.calories}</p>
                        </div>
                        <div className={styles.analysis + ' mr-5'}>
                            <p className='text text_type_main-default mb-3'>Белки, г</p>
                            <p className='text text_type_digits-default'>{ingredient.proteins}</p>
                        </div>
                        <div className={styles.analysis + ' mr-5'}>
                            <p className='text text_type_main-default mb-3'>Жиры, г</p>
                            <p className='text text_type_digits-default'>{ingredient.fat}</p>
                        </div>
                        <div className={styles.analysis}>
                            <p className='text text_type_main-default mb-3'>Углеводы, г</p>
                            <p className='text text_type_digits-default'>{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default IngredientDetails
