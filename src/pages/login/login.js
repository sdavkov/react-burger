import React, {useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser, setUserFormValue} from "../../services/actions/auth";
import Error from "../../components/error/error";

export function LoginPage(props) {

    const {
        email,
        password,
        authRequest,
        authRequestFailedMessage
    } = useSelector(store => ({
        email: store.auth.authUserForm.email,
        password: store.auth.authUserForm.password,
        authRequest: store.auth.authRequest,
        authRequestFailedMessage: store.auth.authRequestFailedMessage,
    }))

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        dispatch(setUserFormValue(e.target.name, e.target.value));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser())
    }

    return (
        <div className={styles.login}>
            <p className="text text_type_main-medium">Вход</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input
                        value={email}
                        name='email'
                        placeholder='E-mail'
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        value={password}
                        name='password'
                        onChange={onChangeHandler}
                    />
                </div>
                <Button type="primary" size="medium" disabled={authRequest}>
                    Войти
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage}/>}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
}