import commerce from 'lib/commerce'
import CategoryList from 'components/category/categoryList'

export async function getStaticProps() {
  const { data: categories } = await commerce.categories.list()

  return {
    props: {
      categories
    }
  }
}

export default function CategoryPage({ categories }) {
  return (
    <>
      <h1>Categories</h1>
      <CategoryList categories={categories} />
    </>
  )
}
