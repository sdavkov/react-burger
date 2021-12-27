import React from 'react'
import styles from './app-header-item.module.css'

const AppHeaderItem = (props) => {
    return (
        <div className={styles.item + ' p-5'}>
            {props.children}<p className="text text_type_main-default ml-2">{props.text}</p>
        </div>
    )
}

export default AppHeaderItem