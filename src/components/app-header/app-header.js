import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import AppHeaderItem from '../app-header-item/app-header-item'
import styles from './app-header.module.css'

const AppHeader = React.memo(() => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.row + ' pt-4 pb-4'}>
                    <nav className={styles.nav}>
                        <AppHeaderItem text='Конструктор' active={true} extCssClasses='pt-5 pr-5 pb-5'><BurgerIcon
                            type="secondary"/></AppHeaderItem>
                        <AppHeaderItem text='Лента заказов' active={false} extCssClasses="p-5"><ListIcon
                            type="secondary"/></AppHeaderItem>
                    </nav>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                    <div className={styles.profile}>
                    <AppHeaderItem text='Личный кабинет' active={false} extCssClasses='pt-5 pl-5 pb-5'><ProfileIcon
                        type="secondary"/></AppHeaderItem>
                    </div>
                </div>
            </div>
        </header>
    )
})

export default AppHeader
