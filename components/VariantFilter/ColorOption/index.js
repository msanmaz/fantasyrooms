/**
 *
 * ColorButton
 *
 */

import useClasses from 'lib/hooks/useClasses'
import { useMemo } from 'react'
import Button from 'components/Button'
import styles from './index.module.scss'

export const color_names = [
	{ name: 'black', hex: '#000000' },
	{ name: 'gray', hex: '#808080' },
	{ name: 'grey', hex: '#808080' },
	{ name: 'light gray', hex: '#D3D3D3' },
	{ name: 'white', hex: '#FFFFFF' },
	{ name: 'navy', hex: '#000080' },
	{ name: 'blue', hex: '#4747ef' },
	{ name: 'light blue', hex: '#A4C0E6' },
	{ name: 'teal', hex: '#008080' },
	{ name: 'cyan', hex: '#00FFFF' },
	{ name: 'turquoise', hex: '#40E0D0' },
	{ name: 'aqua marine', hex: '#7FFFD4' },
	{ name: 'green', hex: '#33d233' },
	{ name: 'chartreuse', hex: '#ADFF2F' },
	{ name: 'olive', hex: '#808000' },
	{ name: 'beige', hex: '#D1C699' },
	{ name: 'maroon', hex: '#800000' },
	{ name: 'brown', hex: '#6E481B' },
	{ name: 'red', hex: '#e91616' },
	{ name: 'tomato', hex: '#FF6347' },
	{ name: 'orange', hex: '#FF9000' },
	{ name: 'yellow', hex: '#FFFF00' },
	{ name: 'purple', hex: '#800080' },
	{ name: 'indigo', hex: '#2E0854' },
	{ name: 'magenta', hex: '#FF00FF' },
	{ name: 'pink', hex: '#FFC0CB' },
]

const ColorOption = ({ value, className, children, ...props }) => {
	const style = useMemo(() => {
		if (!value) return null
		const trimmed = value.toLowerCase().trim()
		const color = color_names.find(c => c.name === trimmed)
		if (color) return { backgroundColor: color.hex }
		return null
	}, [value])

	const cls = useClasses(className, styles.color_option)

	return <Button className={cls} style={style} {...props} />
}

export default ColorOption
