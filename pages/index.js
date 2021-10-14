import Link from 'next/link'

import { setServerState, wrapper } from 'lib/redux'
import { readCache } from 'lib/cache'

import CategoryList from 'components/CategoryList'
import Cats from 'components/Cats'
import Hero from 'components/Hero'
import ProductList from 'components/Products/productList'
import ProductCard from 'components/ProductCard'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
	const props = await readCache()
	store.dispatch(setServerState(props))
	return {
		props,
	}
})

// export async function getStaticProps() {
// 	const merchant = await commerce.merchants.about()
// 	const { data: products } = await commerce.products.list()
// 	const { data: categories } = await commerce.categories.list()
// 	return {
// 		props: {
// 			merchant,
// 			products,
// 			categories,
// 		},
// 	}
// }

export default function Home({ merchant, products, categories }) {
	return (
		<>
			<Hero />
			<Cats />
			{/*
			<h1>{merchant.business_name}</h1>
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

			<div className='bg-white'>
				<div className='max-w-2xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8'>
					<h2 className='text-2xl font-extrabold tracking-tight flex justify-center text-gray-900'>Customers also purchased</h2>
					<div className='mt-6 grid grid-cols-2 gap-y-10 gap-x-1 lg:gap-x-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-1'>
						{products.map(product => (
							<ProductCard {...product} key={product.id} />
						))}
					</div>
					<h2 className='flex justify-center text-bold py-12'>
						View All{' '}
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</h2>
				</div>
			</div>

			<div className='lg:px-24 px-4'>
				<div className='rounded-lg shadow-lg my-20 flex flex-row bg-gradient-to-r from-black to-purple-900'>
					<div className='lg:w-3/5 w-full bg-gradient-to-r from-black to-purple-900 lg:from-black lg:via-purple-900 lg:to-transparent rounded-lg text-gray-100 p-12'>
						<div className='lg:w-9/12'>
							<h3 className='text-2xl font-extrabold mb-4'>Subscribe to get our offers first</h3>
							<p className='mb-4 leading-relaxed'>
								Want to hear from us when we have new offers? Sign up for our newsletter and we'll email you every time we
								have new sale offers.
							</p>
							<div>
								<input
									type='email'
									placeholder='Enter email address'
									className='bg-gray-600 text-gray-200 placeholder-gray-400 px-4 py-3 w-full rounded-lg focus:outline-none mb-4'
								/>
								<button type='submit' className='bg-red-600 py-3 rounded-lg w-full'>
									Subscribe
								</button>
							</div>
						</div>
					</div>
					<div className='lg:w-1/5 w-full lg:flex lg:flex-row hidden  '>
						<img src='fantasy2.png' className='h-96' />
						<img src='fantasy3.png' className='h-96' />
					</div>
				</div>
			</div>
		</>
	)
}
