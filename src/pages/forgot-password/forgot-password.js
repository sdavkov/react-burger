import React from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./forgot-password.module.css";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, setUserFormValue} from "../../services/actions/auth";
import Error from "../../components/error/error";

export function ForgotPasswordPage(props) {

    const {
        email,
        authRequest,
        authRequestFailedMessage,
    } = useSelector(store => ({
        email: store.auth.authUserForm.email,
        authRequest: store.auth.authRequest,
        authRequestFailedMessage: store.auth.authRequestFailedMessage,
    }))

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        dispatch(setUserFormValue(e.target.name, e.target.value));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword())
    }

    return (
        <div className={styles.forgot_password}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input type={'email'}
                           value={email}
                           onChange={onChangeHandler}
                           name='email'
                           placeholder='Укажите e-mail'
                    />
                </div>
                <Button type="primary" size="medium" disabled={authRequest}>
                    Восстановить
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage}/>}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}