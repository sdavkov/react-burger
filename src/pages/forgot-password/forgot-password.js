import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./forgot-password.module.css";

export function ForgotPasswordPage(props) {

    const [email, setEmail] = useState("");

    return (
        <div className={styles.forgot_password}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form className={'mt-6'}>
                <div className={'mb-6'}>
                    <Input type={'email'}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           name='email'
                           placeholder='Укажите e-mail'
                    />
                </div>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    );
}