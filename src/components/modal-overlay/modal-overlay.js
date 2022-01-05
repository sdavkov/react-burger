import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = React.memo(({setVisible, children}) => {
    return (
        <div className={styles.overlay} onClick={() => setVisible(false)}>
            {children}
        </div>
    )
})

ModalOverlay.propTypes = {
    setVisible: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}

export default ModalOverlay
