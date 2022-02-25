import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay: FunctionComponent<IModalOverlay> = React.memo(({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    )
})

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default ModalOverlay
