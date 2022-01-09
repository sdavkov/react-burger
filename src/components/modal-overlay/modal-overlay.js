import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

const ModalOverlay = React.memo(({setVisible}) => {
    return (
        <div className={styles.overlay} onClick={() => setVisible(false)}>
        </div>
    )
})

ModalOverlay.propTypes = {
    setVisible: PropTypes.func.isRequired,
}

export default ModalOverlay
