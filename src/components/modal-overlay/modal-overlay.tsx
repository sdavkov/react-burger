import React, { FunctionComponent } from 'react'
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

export default ModalOverlay
