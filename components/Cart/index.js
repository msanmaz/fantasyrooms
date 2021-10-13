/**
 *
 * Cart
 *
 */

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from 'lib/redux'
import styles from './index.module.scss'

const Cart = () => {
	const cart = useSelector(selectCart)

	const items = useMemo(() => {
		if (!cart?.line_items) return null
	})

	return <div className={styles.cart}>{items}</div>
}

export default Cart
