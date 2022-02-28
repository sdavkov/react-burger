import React, { FunctionComponent } from 'react'
import styles from './app-header-item.module.css'
import { Link, useLocation } from "react-router-dom";

interface IAppHeaderItem {
    text: string;
    extCssClasses: string;
    to?: string;
}

const AppHeaderItem: FunctionComponent<IAppHeaderItem> = React.memo(({ text, children, extCssClasses, to }) => {

    const location = useLocation();

    return (
        <div className={styles.item + ' ' + extCssClasses}>
            {children}
            <p className={(to && location.pathname.startsWith(to)) ? 'text text_type_main-default ml-2' : 'text text_type_main-default ml-2 text_color_inactive'}>
                {to ? <Link style={{ color: "inherit" }} to={to}>{text}</Link> : text}
            </p>
        </div>
    )
})

export default AppHeaderItem