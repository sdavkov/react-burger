import React, { FC } from 'react'
import styles from './detail-page.module.css'

const DetailPage: FC = ({ children }) => {
	return (
		<div className={styles.detail_page}>
			{children}
		</div>
	)
}

export default DetailPage