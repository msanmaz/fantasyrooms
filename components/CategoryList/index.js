import { memo } from 'react'

import Category from 'components/Category'
import styles from './index.module.scss'

const CategoryList = ({ categories }) => (
	<ul className={styles.category_list}>
		{categories.map(category => (
			<li key={category.slug}>
				<Category category={category} />
			</li>
		))}
	</ul>
)

export default memo(CategoryList)
