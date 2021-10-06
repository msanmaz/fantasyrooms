import commerce from '../lib/commerce'
import React from 'react';
import ProductList from '../components/products/productList'
import CategoryList from '../components/category/categoryList'
import Layout from '../layout/layout'
import Link from 'next/link'
import Hero from '../components/Hero'

import Card from '../components/Card'



export async function getStaticProps() {
  const merchant = await commerce.merchants.about()
  const { data: products } = await commerce.products.list()
  const { data: categories } = await commerce.categories.list()

  return {
    props: {
      merchant,
      products,
      categories
    }
  }
}

export default function Home({ merchant, products, categories }) {






  return (
    <>

    <Hero/>

      {/* <h1>{merchant.business_name}</h1>
      <h3>
        <Link href='/categories'>
          <a>Categories</a>
        </Link>
      </h3>
      <CategoryList categories={categories} />

      <h3>
        <Link href='/products'>
          <a>Products</a>
        </Link>
      </h3> */}

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight flex justify-center text-gray-900">Customers also purchased</h2>
          <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

          {products.map((product) => (
            
     <Card {...product} key={product.id}/>
        ))}
          </div>
        </div>
      </div>



    </>
  )
}

Home.Layout = Layout;