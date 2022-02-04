import React, {useRef, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./reset-password.module.css";

export function ResetPasswordPage(props) {

    const [email, setEmail] = useState("");
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
            <form className={'mt-6'}>
                <div className={'mb-6'}>
                    <Input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           name='password'
                           placeholder='Введите новый пароль'
                           icon={passwordInputProps.icon}
                           type={passwordInputProps.type}
                           onIconClick={onPasswordIconClick}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           name='code'
                           placeholder='Введите код из письма'
                           type="text"
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