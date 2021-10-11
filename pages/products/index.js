import { React, useState, useEffect, useMemo } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import commerce from 'lib/commerce'
import useClasses from 'lib/hooks/useClasses'
import SecondCard from 'components/SecondCard'

import styles from './index.module.css'

export async function getStaticProps() {
  // const { data: products } = await commerce.products.list()
  // const { data: categories } = await commerce.products.list()

  const [{ data: products }, { data: categories }] = await Promise.all([commerce.products.list(), commerce.categories.list()])

  return {
    props: {
      products,
      categories,
    }
  }
}

export default function ProductPage({ products, categories }) {

  const [currentCategory, setCurrentCategory] = useState('all')
  const [product, setProduct] = useState()

  // const {asPath} = useRouter()
  // const current_category = useMemo(()=>{
  //   console.log('current path:', asPath)
  //   const slug = asPath.replace(/^\//, '')
  // },[asPath])

  // this function returns products filtered by category
  const categoryProducts = useMemo(() => {
    console.log('useMemo filtered run aim:', currentCategory)

    // if there aren't any products return an empty array, which in the rendering function will turn into 0 product divs
    if (!products) {
      // console.log('\tno products')
      return []
    }

    // if aim is not set (if you forgot default value for example) return all products
    // also if aim is 'all' skip filtering the products because we obviously return all of them
    if (!currentCategory) {
      // console.log('\tno aim')
      return products
    }

    // here we return any product who's categories include one with the slug equaling the value of 'aim'
    return products.filter(p => p.categories.findIndex(category => category.slug === currentCategory) !== -1)
  }, [products, currentCategory])

  // console.log({ aim: currentCategory, filtered: categoryProducts })

  // this function takes categories and turns them into category buttons
  const categoryButtons = useMemo(() => {
    if (!categories) return null

    // <Button buttons={["All", "Harness", "Garter", "Leather", "Latex", "Fetish"]} doSomethingAfterClick={printButtonLabel} />

    const onCategoryClick = e => {
        // console.log('set current category:', e.target.id)
        setCurrentCategory(e.target.id)
    }

    return categories.map(({slug, name}) => {
      // const cls = useClasses(styles.category, slug === currentCategory && styles.current_category)
      return (
        <button id={slug} key={slug} onClick={onCategoryClick} className={`${styles.category} ${slug === currentCategory ? styles.current_category : ''}`}>{name}</button>
      )
    })
  }, [categories, currentCategory, setCurrentCategory])

  // this function takes products filtered by "categoryProducts" memo and turns them into product cards
  const productCards = useMemo(() => {
    console.log('product cards memo cat:', currentCategory)
    return categoryProducts.map(product => (<SecondCard {...product} key={product.id} />))
  },[categoryProducts, currentCategory])

  return (
        <div className="">
          <div className="flex flex-wrap md:flex-nowrap  flex-1 min-w-full" data-aos-id-blocks>
            <div className="md:w-1/4 w-full  flex items-stretch grid-1 max-h-44">
              <div className="md:flex hidden  md:flex-wrap flex-1 p-4">
                <div className="w-full h-screen shadow-md bg-gray-300 rounded-lg">
                  <h1 className="text-2xl font-italic px-12 py-4">Trade Only</h1>
                  <div className="w-full flex px-12 flex-wrap">
                    <Link href="/contact">
                      <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                        Contact Us
                      </button>
                    </Link>
                    <Link href="/about">
                      <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                        Price Enquiry
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full h-screen my-8 shadow-md bg-gray-300 rounded-lg -mt-20 ">
                  <h1 className="text-2xl font-italic px-12 py-4">Newsletter</h1>
                  <h2 className="text-sm px-12">Get the latest updates, news and product offers via email</h2>
                  <div className="px-12 py-4">
                    <input className="rounded-lg" placeholder="Email"></input>
                    <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/4 w-full flex flex-wrap items-stretch grid2">
              <div className="flex  flex-wrap flex-1 min-w-full">
                <div className="w-full flex p-4 items-stretch md:h-tam h-screen">
                  <div className="bg-productsbg bg-cover bg-left-top flex relative w-full rounded-lg">
                    <h1 className="text-3xl font-bold text-white font-sans absolute top-8 left-2">Products</h1>
                  </div>
                </div>
                <div className="absolute md:top-55 top-80 w-full md:w-3/4 px-4 ">
                  <div className="flex w-full" data-aos-id-blocks>
                    <div className="md:px-1 px-auto space-y-2 space-x-2">
                      {categoryButtons}
                    </div>
                  </div>
                </div>
                <div className="bg-white">
                  <div className="max-w-2xl py-14 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-2 gap-y-10 gap-x-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-1">
                      {productCards}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}