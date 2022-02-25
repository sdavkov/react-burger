import React, { SyntheticEvent, useEffect } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./reset-password.module.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../services/actions/auth";
import Error from "../../components/error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { ILocationState } from '../../utils/ts-types'

interface IResetPasswordForm {
    password: string;
    token: string;
}

export function ResetPasswordPage() {

    const location = useLocation<ILocationState>();
    const reset = location.state && location.state.reset;
    const history = useHistory();

    useEffect(() => {
        !reset && history.replace('/forgot-password')
    }, [reset, history])

    const initForm: IResetPasswordForm = {
        password: '',
        token: '',
    }

    const { form, onChangeHandler } = useForm<IResetPasswordForm>(initForm);
    const { authRequest, authRequestFailedMessage } = useAuth();
    const dispatch = useDispatch();

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(resetPassword(form))
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
            {authRequestFailedMessage && <Error message={authRequestFailedMessage} />}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}