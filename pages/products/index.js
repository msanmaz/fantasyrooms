import { React, useState, useEffect, useMemo, forwardRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { setServerState, wrapper } from 'lib/redux'
import { readCache } from 'lib/cache'
import useClasses from 'lib/hooks/useClasses'
import ProductCard from 'components/ProductCard'

import styles from './index.module.scss'

// Inner Components

export const BlackButton = forwardRef(({ children, ...props }, ref) => (
	<button
		ref={ref}
		className='py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
		{...props}
	>
		{children}
	</button>
))

// Main Component

const ProductPage = ({ products, categories }) => {
	const [currentCategory, setCurrentCategory] = useState('all')
	const [product, setProduct] = useState()

	// TODO: determine current category by route instead of SPA
	// const { asPath } = useRouter()
	// const current_category = useMemo(() => {
	// 	console.log('current path:', asPath)
	// 	const slug = asPath.replace(/^\//, '')
	// }, [asPath])

	// this function returns products filtered by category
	const categoryProducts = useMemo(() => {
		// if there aren't any products return an empty array, which in the rendering function will turn into 0 product divs
		if (!products) return []

		// if currentCategory is not set (if you forgot default value for example) return all products
		// also if currentCategory is 'all' skip filtering the products because we obviously return all of them
		if (!currentCategory) return products

		// here we return any product who's categories include one with the slug equaling the value of 'currentCategory'
		return products.filter(p => p.categories.findIndex(category => category.slug === currentCategory) !== -1)
	}, [products, currentCategory])

	// memoized mapping from categories to category buttons
	const categoryButtons = useMemo(
		() =>
			categories
				? categories.map(({ slug, name }) => (
						<button
							id={slug}
							key={slug}
							onClick={e => setCurrentCategory(e.target.id)}
							className={`${styles.category_button} ${slug === currentCategory ? styles.current_category : ''}`}
						>
							{name}
						</button>
				  ))
				: null,
		[categories, currentCategory, setCurrentCategory]
	)

	// memoized mapping from the filtered "categoryProducts" to product cards
	const productCards = useMemo(
		() => categoryProducts.map(product => <ProductCard product={product} key={product.id} />),
		[categoryProducts, currentCategory]
	)

	return (
		<div className={styles.product_page}>
			<div className='flex flex-wrap md:flex-nowrap flex-1 min-w-full' data-aos-id-blocks>
				<div className='md:w-1/4 w-full flex items-stretch grid-1 max-h-44'>
					<div className='md:flex hidden md:flex-wrap flex-1 p-4'>
						<div className='w-full h-screen shadow-md bg-gray-300 rounded-lg'>
							<h1 className='text-2xl font-italic px-12 py-4'>Trade Only</h1>
							<div className='w-full flex px-12 flex-wrap'>
								<Link href='/contact'>
									<BlackButton>Contact Us</BlackButton>
								</Link>
								<Link href='/about'>
									<BlackButton>Contact Us</BlackButton>
								</Link>
							</div>
						</div>
						<div className='w-full h-screen my-8 shadow-md bg-gray-300 rounded-lg -mt-20 '>
							<h1 className='text-2xl font-italic px-12 py-4'>Newsletter</h1>
							<h2 className='text-sm px-12'>Get the latest updates, news and product offers via email</h2>
							<div className='px-12 py-4'>
								<input className='rounded-lg' placeholder='Email'></input>
								<BlackButton>Subscribe</BlackButton>
							</div>
						</div>
					</div>
				</div>
				<div className='md:w-3/4 w-full flex flex-wrap items-stretch grid2'>
					<div className='flex flex-wrap flex-1 min-w-full'>
						<div className='w-full flex p-4 items-stretch md:h-tam h-screen'>
							<div className='bg-productsbg bg-cover bg-left-top flex relative w-full rounded-lg'>
								<h1 className='text-3xl font-bold text-white font-sans absolute top-8 left-2'>Products</h1>
							</div>
						</div>
						<div className='absolute md:top-55 top-80 w-full md:w-3/4 px-4 '>
							<div className='flex w-full' data-aos-id-blocks>
								<div className='md:px-1 px-auto space-y-2 space-x-2'>{categoryButtons}</div>
							</div>
						</div>
						<div className='bg-white'>
							<div className='max-w-2xl py-14 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
								<div className='grid grid-cols-2 gap-y-10 gap-x-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-1'>
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

export default ProductPage

// Static

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const props = await readCache()
	dispatch(setServerState(props))
	props.title = 'Products'

	return {
		props,
	}
})
