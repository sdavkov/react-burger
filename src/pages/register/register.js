import React, {useState} from 'react';
import {PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./register.module.css";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, setAuthFormValue, setUserFormValue} from "../../services/actions/auth";
import Error from "../../components/error/error";

export function RegisterPage(props) {

    const {
        name,
        email,
        password,
        authRequest,
        authRequestFailedMessage,
    } = useSelector(store => ({
        name: store.auth.authUserForm.name,
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
      dispatch(registerUser())
    }

    console.log(authRequestFailedMessage)

    return (
        <div className={styles.register}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input
                        value={name}
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        value={email}
                        type={'email'}
                        name='email'
                        placeholder={'E-mail'}
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
                    Зарегистрироваться
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage}/>}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}