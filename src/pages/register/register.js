import React, {useState} from 'react';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./register.module.css";

export function RegisterPage(props) {

    const [email, setEmail] = useState("");

    return (
        <div className={styles.register}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form className={'mt-6'}>
                <div className={'mb-6'}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                    />
                </div>
                <div className={'mb-6'}>
                    <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
                </div>
                <div className={'mb-6'}>
                    <PasswordInput value={email} onChange={(e) => setEmail(e.target.value)} name='password'/>
                </div>
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}