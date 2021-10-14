/**
 * A basic button component with useClasses and
 */

import { forwardRef } from 'react'
import useClasses from 'lib/hooks/useClasses'
import styles from './index.module.scss'

const Button = forwardRef(({ id, name, className, disabled, selected, children, ...props }, ref) => {
	const cls = useClasses(styles.button, className, disabled && `${styles.disabled} disabled`, selected && `${styles.selected} selected`)

	return (
		<button
			ref={ref}
			id={id || name}
			name={name}
			data-name={name}
			className={cls}
			disabled={disabled}
			data-disabled={disabled}
			data-selected={selected}
			{...props}
		>
			{children}
		</button>
	)
})

export default Button
