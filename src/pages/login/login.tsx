import React, { SyntheticEvent } from 'react';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/actions/auth";
import Error from "../../components/error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

interface ILoginForm {
    email: string;
    password: string;
}

export function LoginPage() {

    const initForm: ILoginForm = {
        email: '',
        password: '',
    }

    const { form, onChangeHandler } = useForm<ILoginForm>(initForm)

    const { authRequest, authRequestFailedMessage } = useAuth();

    const dispatch = useDispatch();

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUser(form))
    }

    return (
        <div className={styles.login}>
            <p className="text text_type_main-medium">Вход</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input
                        value={form.email}
                        name='email'
                        placeholder='E-mail'
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        value={form.password}
                        name='password'
                        onChange={onChangeHandler}
                    />
                </div>
                <Button type="primary" size="medium" disabled={authRequest}>
                    Войти
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage} />}
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