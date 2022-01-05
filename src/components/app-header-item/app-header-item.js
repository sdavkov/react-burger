import React from 'react'
import styles from './app-header-item.module.css'

const AppHeaderItem = React.memo(({text, children, active}) => {
    return (
        <div className={styles.item + ' p-5'}>
            {children}<p className={active ? 'text text_type_main-default ml-2' : 'text text_type_main-default ml-2 text_color_inactive'}>{text}</p>
        </div>
    )
})

export default AppHeaderItem