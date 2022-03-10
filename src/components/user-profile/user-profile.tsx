import React, { SyntheticEvent } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./user-profile.module.css";
import { useDispatch } from "react-redux";
import Error from "../error/error";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { updateUser } from '../../services/slices/auth';

export interface IUserProfileForm {
    name: string;
    email: string;
    password: string;
}

function UserProfile() {

    const { authRequest, authRequestFailedMessage, currentUser } = useAuth();

    const { form, setForm, onChangeHandler } = useForm<IUserProfileForm>({
        name: currentUser ? currentUser.name : '',
        email: currentUser ? currentUser.email : '',
        password: ''
    });

    const dispatch = useDispatch();

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUser(form))
    }

    const onChancelHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setForm({
            name: currentUser ? currentUser.name : '',
            email: currentUser ? currentUser.email : '',
            password: ''
        });
    }

    return (
        <React.Fragment>
            <form className={'mt-6'} onSubmit={onSubmitHandler}>
                <div className={'mb-6'}>
                    <Input type='text' value={form.name} onChange={onChangeHandler} name='name' placeholder='Имя' icon='EditIcon' />
                </div>
                <div className={'mb-6'}>
                    <Input type='email' value={form.email} onChange={onChangeHandler} name='email' placeholder='Логин' icon='EditIcon' />
                </div>
                <div className={'mb-6'}>
                    <Input type='password' value={form.password} onChange={onChangeHandler} name='password' placeholder='Пароль' icon='CloseIcon' />
                </div>
                <div className={styles.actions}>
                    <p className="text text_type_main-default text_color_inactive mr-7">
                        <a className={styles.link} onClick={onChancelHandler} href='/'>Отмена</a>
                    </p>
                    <Button type="primary" size="medium" disabled={authRequest}>
                        Сохранить
                    </Button>
                </div>
            </form>
            {authRequestFailedMessage && <Error message={authRequestFailedMessage} />}
        </React.Fragment>
    )
        ;
}

export default UserProfile;