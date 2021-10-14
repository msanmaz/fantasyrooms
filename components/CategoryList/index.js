import Link from 'next/link'
import { memo } from 'react'

import useClasses from 'lib/hooks/useClasses'
import styles from './index.module.scss'

export const CategoryItem = ({ className, category, ...props }) => {
	const cls = useClasses(styles.category_item, className)

	return (
		<Link href={`/categories/${category.slug}`}>
			<a className={cls} {...props}>
				{category.name}
			</a>
		</Link>
	)
}

const CategoryList = ({ categories }) => (
	<ul className={styles.category_list}>
		{categories.map(category => (
			<li key={category.slug}>
				<CategoryItem category={category} />
			</li>
		))}
	</ul>
)

export default memo(CategoryList)
