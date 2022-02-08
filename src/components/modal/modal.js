import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import {ESCAPE_VALUE} from "../../utils/constants";

const modalRoot = document.getElementById("react-modals");

const Modal = React.memo(({ onClose, title, children }) => {

    useEffect(() => {

        const keyDown = (e) => {
            if (e.key === ESCAPE_VALUE)
                onClose();
        }

        window.addEventListener('keydown', keyDown)
        return () => {
            window.removeEventListener('keydown', keyDown)
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.title + ' pl-10 pt-10 pr-10'}>
                    <p className='text text_type_main-large'>{title}</p>
                    <div className={styles.close}>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                </div>
                {children}
            </div>
            <ModalOverlay closeModal={onClose} />
        </>
        , modalRoot
    )
})

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default Modal