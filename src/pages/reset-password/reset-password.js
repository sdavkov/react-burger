import React, {useEffect, useRef, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import styles from "./reset-password.module.css";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, resetPassword, setUserFormValue} from "../../services/actions/auth";
import Error from "../../components/error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

export function ResetPasswordPage(props) {

    const location = useLocation();
    const reset = location.state && location.state.reset;
    const history = useHistory();

    useEffect(() => {
        !reset && history.replace('/forgot-password')
    }, [reset, history])

    const {form, onChangeHandler} = useForm({password: '', token: ''});
    const {authRequest, authRequestFailedMessage} = useAuth();
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(form))
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
                    <Input value={form.password}
                           onChange={onChangeHandler}
                           name='password'
                           placeholder='Введите новый пароль'
                           icon={passwordInputProps.icon}
                           type={passwordInputProps.type}
                           onIconClick={onPasswordIconClick}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input value={form.token}
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