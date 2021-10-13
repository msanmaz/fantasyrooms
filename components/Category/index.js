import Link from 'next/link'

import useClasses from 'lib/hooks/useClasses'
import styles from './index.module.scss'

const Category = ({ className, category, ...props }) => {
	const cls = useClasses(styles.category, className)

	return (
		<Link href={`/categories/${category.slug}`}>
			<a className={cls} {...props}>
				{category.name}
			</a>
		</Link>
	)
}

export default Category
