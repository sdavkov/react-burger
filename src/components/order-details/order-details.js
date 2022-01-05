import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'
import styles from './order-details.module.css'
import orderImage from '../../images/order.svg'

const OrderDetails = React.memo(({ visible, setVisible }) => {
    return (
        <Modal visible={visible} setVisible={setVisible}>
            <div className={styles.details}>
                <p className={styles.number + ' text text_type_digits-large mt-2 mb-8'}>123456</p>
                <p className="text text_type_main-medium">Идентификатор заказа</p>
                <img className='mb-15 mt-15' src={orderImage} />
                <p className="text text_type_main-medium mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-medium text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
})

OrderDetails.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired
}

export default OrderDetails
