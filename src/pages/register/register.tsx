import React, { SyntheticEvent } from 'react';
import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import Error from "../../components/error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { registerUser } from '../../services/slices/auth';
import { useAppDispatch } from '../../services/store';

export interface IRegisterForm {
    name: string;
    email: string;
    password: string;
}

export function RegisterPage() {

    const initForm: IRegisterForm = {
        name: '',
        email: '',
        password: '',
    }

    const { form, onChangeHandler } = useForm<IRegisterForm>(initForm)
    const { authRequest, authRequestFailedMessage } = useAuth();

    const dispatch = useAppDispatch();

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerUser(form))
    }

    return (
        <div className={styles.register}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input
                        value={form.name}
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        value={form.email}
                        type={'email'}
                        name='email'
                        placeholder={'E-mail'}
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
                    Зарегистрироваться
                </Button>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage} />}
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}