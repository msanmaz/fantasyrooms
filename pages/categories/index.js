import commerce from 'lib/commerce'
import { setServerState, wrapper } from 'lib/redux'
import { readCache } from 'lib/cache'

import CategoryList from 'components/CategoryList'

import styles from './index.module.scss'

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const props = await readCache()
	delete props.products
	dispatch(setServerState(props))

	props.title = 'Categories'

	return {
		props,
	}
})

// export async function getStaticProps() {
// 	const { data: categories } = await commerce.categories.list()
// 	return {
// 		props: {
// 			categories,
// 		},
// 	}
// }

// export const getStaticPaths = async () => {
// 	const { categories } = await readCache()
// 	// const { data: categories } = await commerce.categories.list()

// 	return {
// 		paths: categories.map(category => ({
// 			params: {
// 				slug: category.slug,
// 			},
// 		})),
// 		fallback: false,
// 	}
// }

const CategoriesPage = ({ categories }) => (
	<div className={styles.category_page}>
		<h1>Categories</h1>
		<CategoryList categories={categories} />
	</div>
)

export default CategoriesPage
