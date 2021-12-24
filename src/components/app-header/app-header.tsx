import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import AppHeaderItem from '../app-header-item/app-header-item'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row + ' pt-4 pb-4'}>
                    <nav className={styles.nav}>
                        <AppHeaderItem text='Конструктор' active={true}><BurgerIcon type="secondary" /></AppHeaderItem>
                        <AppHeaderItem text='Лента заказов' active={false}><ListIcon type="secondary" /></AppHeaderItem>
                    </nav>
                    <Logo />
                    <AppHeaderItem text='Личный кабинет' active={false}><ProfileIcon type="secondary" /></AppHeaderItem>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
