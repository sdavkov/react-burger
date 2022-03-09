import React, { SyntheticEvent } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useDispatch } from "react-redux";
import Error from "../../components/error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { IForgotPasswordForm } from '../../utils/ts-types';
import { forgotPassword } from '../../services/slices/auth';

export function ForgotPasswordPage() {

    const initForm: IForgotPasswordForm = {
        email: ''
    }

    const { form, onChangeHandler } = useForm<IForgotPasswordForm>(initForm)
    const { authRequest, authRequestFailedMessage } = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(form))
        history.push(`/reset-password`, { reset: true })
    }

    return (
        <div className={styles.forgot_password}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input type={'email'}
                        value={form.email}
                        onChange={onChangeHandler}
                        name='email'
                        placeholder='Укажите e-mail'
                    />
                </div>
                <Button type="primary" size="medium" disabled={authRequest}>
                    Восстановить
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage} />}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}