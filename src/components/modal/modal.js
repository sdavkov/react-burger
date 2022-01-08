import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';

const modalRoot = document.getElementById("react-modals");

const Modal = React.memo(({ visible, setVisible, title, children }) => {

    const keyDown = (e) => {
        if (e.keyCode === 27)
            setVisible(false);
    }

    useEffect(() => {
        window.addEventListener('keydown', keyDown)
        return () => {
            window.removeEventListener('keydown', keyDown)
        }
    })

    return ReactDOM.createPortal(
        visible && (
            <>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.title + ' pl-10 pt-10 pr-10'}>
                        <p className='text text_type_main-large'>{title}</p>
                        <div className={styles.close}>
                            <CloseIcon type="primary" onClick={() => setVisible(false)} />
                        </div>
                    </div>
                    {children}
                </div>
                <ModalOverlay setVisible={setVisible} />
            </>)
        , modalRoot
    )
})

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default Modal