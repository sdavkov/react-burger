import React, {useRef, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./reset-password.module.css";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, resetPassword, setUserFormValue} from "../../services/actions/auth";
import Error from "../../components/error/error";

export function ResetPasswordPage(props) {

    const {
        password,
        token,
        authRequest,
        authRequestFailedMessage,
    } = useSelector(store => ({
        email: store.auth.authUserForm.email,
        token: store.auth.authUserForm.token,
        authRequest: store.auth.authRequest,
        authRequestFailedMessage: store.auth.authRequestFailedMessage,
    }))

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        dispatch(setUserFormValue(e.target.name, e.target.value));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword())
    }

    const [passwordInputProps, setPasswordInputProps] = useState({
        type: "password",
        icon: "ShowIcon"
    });

    const onPasswordIconClick = () => {
        if (passwordInputProps.type === "password") {
            setPasswordInputProps({
                type: "text",
                icon: "HideIcon"
            })
        } else {
            setPasswordInputProps({
                type: "password",
                icon: "ShowIcon"
            })
        }
    }

    return (
        <div className={styles.reset_password}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input value={password}
                           onChange={onChangeHandler}
                           name='password'
                           placeholder='Введите новый пароль'
                           icon={passwordInputProps.icon}
                           type={passwordInputProps.type}
                           onIconClick={onPasswordIconClick}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input value={token}
                           onChange={onChangeHandler}
                           name='token'
                           placeholder='Введите код из письма'
                           type="text"
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