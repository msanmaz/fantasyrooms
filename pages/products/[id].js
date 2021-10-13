// import { useCartDispatch } from 'lib/context/cart'

import { useState } from 'react'
import commerce from 'lib/commerce'

import { setServerState, wrapper } from 'lib/redux'
import { readCache } from 'lib/cache'

import styles from './[id].module.scss'

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async ({ params }) => {
	const { products, ...props } = await readCache()
	dispatch(setServerState(props))

	const { id } = params
	const product = products.find(p => p.id === id)

	return {
		props: { ...props, product, title: product.name },
		revalidate: 60,
	}
})

// export async function getStaticProps({ params }) {
// 	const { id } = params

// 	const product = await commerce.products.retrieve(id)

// 	return {
// 		props: {
// 			product,
// 		},
// 		revalidate: 60,
// 	}
// }

export const getStaticPaths = async () => {
	const { products } = await readCache()
	// const { data: products } = await commerce.products.list()

	return {
		paths: products.map(product => ({
			params: {
				id: product.id,
			},
		})),
		fallback: false,
	}
}

export default function ProductPage({ product }) {
	// const { setCart } = useCartDispatch()
	const { variant_groups: variantGroups, assets, meta, related_products: relatedProducts } = product
	const [quantity, setQuantity] = useState(0)

	const addToCart = () => {
		if (quantity > 0) {
			// TODO: validate both quantity and variant options
			console.log('ADDTOCART', quantity)
			// commerce.cart.add(product.id, quantity).then(({ cart }) => setCart(cart))
			// setQuantity(0)
		}
	}

	// ? why do you have empty cart in product page ?
	// const emptyCart = () => commerce.cart.empty().then(({ cart }) => setCart(cart))

	return (
		<div className={styles.product_page}>
			<h1>{product.name}</h1>
			<p>{product.price.formatted_with_symbol}</p>

			<button
				onClick={() => {
					if (quantity > 0) {
						setQuantity(quantity - 1)
					}
				}}
			>
				-
			</button>
			{quantity}
			<button onClick={() => setQuantity(quantity + 1)}>+</button>
			<button onClick={addToCart}>Add to Cart</button>
			{/* <button onClick={emptyCart}>Empty Cart</button> */}
		</div>
	)
}
