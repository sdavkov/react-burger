import React, {useState} from 'react';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./login.module.css";

export function LoginPage(props) {

    const [email, setEmail] = useState("");

    return (
        <div className={styles.login}>
            <p className="text text_type_main-medium">Вход</p>
            <form className={'mt-6'}>
                <div className={'mb-6'}>
                    <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
                </div>
                <div className={'mb-6'}>
                    <PasswordInput value={email} onChange={(e) => setEmail(e.target.value)} name='password'/>
                </div>
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
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