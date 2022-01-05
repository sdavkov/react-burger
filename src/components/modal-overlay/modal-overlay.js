import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = ({setVisible, children}) => {
    return (
        <div className={styles.overlay} onClick={() => setVisible(false)}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    close: PropTypes.func
}

export default ModalOverlay
