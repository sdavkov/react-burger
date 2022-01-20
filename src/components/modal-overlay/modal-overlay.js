import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = React.memo(({ closeModal }) => {
    return (
        <div className={styles.overlay} onClick={closeModal}>
        </div>
    )
})

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay
