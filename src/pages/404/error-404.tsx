import React from 'react';
import styles from './error-404.module.css'
import { useLocation } from "react-router-dom";

export function Error404() {

    const location = useLocation();

    return (
        <div className={styles.error_404}>
            <p className="text text_type_main-large">
                {`Страница "${location.pathname}" не найдена. Ошибка 404.`}
            </p>
        </div>
    );
}