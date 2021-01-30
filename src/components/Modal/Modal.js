import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

function Modal ({onClose, children}) {

    useEffect(() => {
        const keydownCloseModal = ({ code }) => { code === "Escape" && onClose() };
        window.addEventListener('keydown', keydownCloseModal);
        return () => window.removeEventListener('keydown', keydownCloseModal);
    }, [onClose])

    const backdropCloseModal = ({ target, currentTarget }) => {
        target === currentTarget  && onClose();
    }

        return createPortal(
            <div className={s.backdrop} onClick={backdropCloseModal}>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        , document.querySelector('#modal-root'))
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;