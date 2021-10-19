import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { setServerState, wrapper } from 'lib/redux'
import { readCache } from 'lib/cache'
import styles from './[id].module.scss'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { original } from 'immer'
import { useImmer } from 'use-immer'
import Link from 'next/link'

import { IconButton } from '@material-ui/core'
import { AddShoppingCart, Close } from '@material-ui/icons'
// import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

import { addToCart, setModal } from 'lib/redux'
import VariantFilter from 'components/VariantFilter'
import ColorOption from 'components/VariantFilter/ColorOption'

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
	const [images, setImages] = useState('')
	const [cats, setCats] = useState('')
	const { id, name, inventory, image, permalink, variant_groups, variants, lookup } = product

	const available_variants = useMemo(() => (variants ? variants.filter(v => v.inventory !== 0) : null), [])

	const dispatch = useDispatch()

	// memoize initial state
	const initialState = useMemo(() => {
		const s = {
			snack: false,
			valid: true,
		}
		if (variant_groups?.length) {
			const options = {}
			variant_groups.forEach(v => {
				options[v.id] = null
			})
			s.options = options
			s.variantID = null
			s.valid = false
		}
		console.log(name, lookup)
		return s
	}, [id, variant_groups])

	const [state, setState] = useImmer(initialState)

	const onFilterChange = options => {
		console.log('onFilterChange options:', options)
		setState(draft => {
			Object.assign(draft.options, options)

			draft.valid = true

			// if of the options isn't set, set variant to null and return early
			for (const a in draft.options) {
				if (draft.options[a] === null) {
					draft.variantID = null
					draft.valid = false
					break
				}
			}

			// otherwise compute variant from selected options
			if (draft.valid) {
				const variant = available_variants.find(v => {
					for (const o in v.options) if (v.options[o] !== draft.options[o]) return false
					return true
				})

				if (!variant) {
					console.log('Error context', { options: original(draft.options), available_variants })
					throw Error('All options selected yet no variant found')
				}
				draft.variantID = variant.id
			}
		})
	}

	// useEffect(() => {
	// 	console.log('newState', state)
	// }, [state])

	// memoize price - if a variant is selected return the variant price, otherwise the product price
	const price = useMemo(
		() => (state.variantID ? available_variants.find(v => v.id === state.variantID).price || product.price : product.price),
		[state.variantID]
	)

	const variantFilter = useMemo(() => {
		const sizes_order = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
		const sortSize = (a, b) => {
			let inda = sizes_order.indexOf(lookup[a])
			let indb = sizes_order.indexOf(lookup[b])

			if (inda === -1) inda = 900
			if (indb === -1) indb = 900
			return inda - indb
		}

		return (
			<VariantFilter
				id={product.name}
				className={styles.variant_filter}
				data={available_variants}
				lookup={lookup}
				onChange={onFilterChange}
				schema={variant_groups}
				selectedValues={state.options}
				components={{ Color: ColorOption }}
				sortValues={{ Size: sortSize }}
			/>
		)
	}, [state.options, variant_groups, available_variants, lookup])

	const closeSnack = useCallback(() => {
		setState(draft => {
			draft.snack = false
		})
	})

	const openCart = useCallback(() => {
		closeSnack()
		dispatch(setModal(1))
	})

	const onAddToCart = useCallback(() => {
		if (!state.valid) {
			throw Error('Cannot add to cart, invalid variants selection or out of stock, this should not happen')
			return
		}
		if (quantity > 0) {
			dispatch(addToCart(id, 1, state.variantID))
			setState(draft => {
				// after adding to card reset options and price
				Object.assign(draft, initialState)
				draft.snack = true
			})
		}

	}, [state.variantID])



	const getImages = () => {
		const aya = product.assets
		setImages(
			aya.map(img => ({
				original: `${img.url}`,
				thumbnail: `${img.url}`
			})))

	}
	const getCat = () => {
		const aya = product.categories
		const mert =aya.map(img => ({
			cat: `${img.name}`,
		}))
		const json = JSON.stringify(mert[1].cat)
		const noqou =json.replace(/"([^"]+(?="))"/g, '$1')
		setCats(noqou)
			
	}
	const categor = useMemo(getCat, [])
	const formattedData = useMemo(getImages, [])




	// ? why do you have empty cart in product page ?
	// const emptyCart = () => commerce.cart.empty().then(({ cart }) => setCart(cart))

	return (
		<>

			<div className="flex justify-center flex-wrap mt-2 mx-2 h-full w-full">

				<div className="flex w-3/4 md:w-1/2 lg:w-2/6 px-4 my-2 ">
					<ImageGallery thumbnailPosition={'bottom'} showNav={false} showPlayButton={false} items={images} />
				</div>


				<div className="w-full flex flex-col md:w-1/2 lg:w-1/2 px-4 my-2">
				<h1 className="text-xl tracking-tight font-bold text-black my-6  md:text-2xl">
					<Link href={`/categories/${cats}`}>
					{cats}
					</Link>
					</h1>

					<h1 className="text-xl tracking-tight font-bold text-black mb-6  md:text-2xl">{product.name}</h1>
					<div className="w-full flex flex-wrap md:flex-row">


						<div className="md:w-1/3 w-full">
						<p className="text-xl tracking-tight text-gray-600 mb-6  md:text-xl">{price.formatted_with_symbol}</p>
					<p className="text-base tracking-tight font-bold text-black mb-4">Choose Size And Color</p>
					{variantFilter}



					<div className="flex flex-row mt-4">
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


					</div>
					<div className="flex flex-end">
				<button onClick={onAddToCart} className="p-2 mt-6 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300">Add to Cart</button>

				</div>
						</div>

					<div className='md:w-4/6 w-full'>
						<p className="text-base font-sans text-gray-700 ">{product.description}</p>
					</div>


					</div>



				</div>


			</div>





			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={state.snack}
				autoHideDuration={5000}
				onClose={closeSnack}
				message='Product Added To Cart'
				action={
					<>
						<IconButton color='secondary' size='small' aria-label='Add To Cart' onClick={openCart}>
							<AddShoppingCart style={{ fill: 'white' }} />
						</IconButton>
						<IconButton size='small' aria-label='close' color='inherit' onClick={closeSnack}>
							<Close fontSize='small' />
						</IconButton>
					</>
				}
			/>
		</>
	)
}
