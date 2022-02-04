import React from 'react';
import styles from './profile.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ProfilePage(props) {
    return (
        <div className={styles.profile}>
            <div className={styles.nav}>
                <ul>
                    <li>
                        <p className="text text_type_main-medium">Профиль</p>
                    </li>
                    <li>
                        <p className="text text_type_main-medium text_color_inactive">История заказов</p>
                    </li>
                    <li>
                        <p className="text text_type_main-medium text_color_inactive">Выход</p>
                    </li>
                </ul>
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <div className={styles.content}>
                <form className={'mt-6'}>
                    <div className={'mb-6'}>
                        <Input type='text' name='name' placeholder='Имя' icon='EditIcon'/>
                    </div>
                    <div className={'mb-6'}>
                        <Input type='text' name='email' placeholder='Логин' icon='EditIcon'/>
                    </div>
                    <div className={'mb-6'}>
                        <Input type='password' name='email' placeholder='Пароль' icon='CloseIcon'/>
                    </div>
                    <div className={styles.actions}>
                        <p className="text text_type_main-default text_color_inactive mr-7">
                            <Link className={styles.link} to="/">Отмена</Link>
                        </p>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}