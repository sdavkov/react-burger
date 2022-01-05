import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ visible, setVisible, title, children }) => {

    return ReactDOM.createPortal(
        visible && (
            <ModalOverlay setVisible={setVisible}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.title + ' pl-10 pt-10 pr-10'}>
                        <p className='text text_type_main-large'>{title}</p>
                        <CloseIcon type="primary" onClick={() => setVisible(false)} />
                    </div>
                    {children}
                </div>
            </ModalOverlay>)
        , modalRoot
    )
}

Modal.propTypes = {

}

export default Modal