import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Link } from 'react-router-dom'
import AppHeaderItem from '../app-header-item/app-header-item'
import styles from './app-header.module.css'

const AppHeader = React.memo(() => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row + ' pt-4 pb-4'}>
                    <nav className={styles.nav}>
                        <AppHeaderItem text='Конструктор' extCssClasses='pt-5 pr-5 pb-5' to='/'><BurgerIcon
                            type="secondary" /></AppHeaderItem>
                        <AppHeaderItem text='Лента заказов' extCssClasses="p-5" to='/feed'><ListIcon
                            type="secondary" /></AppHeaderItem>
                    </nav>
                    <div className={styles.logo}>
                        <Link to='/'><Logo /></Link>
                    </div>
                    <div className={styles.profile}>
                        <AppHeaderItem text='Личный кабинет' extCssClasses='pt-5 pl-5 pb-5' to='/profile'><ProfileIcon
                            type="secondary" /></AppHeaderItem>
                    </div>
                </div>
            </div>
        </header>
    )
})

export default AppHeader
