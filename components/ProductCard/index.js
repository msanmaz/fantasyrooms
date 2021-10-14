import { useCallback, useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { original } from 'immer'
import { useImmer } from 'use-immer'
import Link from 'next/link'

import { IconButton } from '@material-ui/core'
import { AddShoppingCart, Close } from '@material-ui/icons'
// import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

import Button from 'components/Button'
import { addToCart, setModal } from 'lib/redux'
import commerce from 'lib/commerce'
import VariantFilter from 'components/VariantFilter'
import ColorOption from 'components/VariantFilter/ColorOption'

import styles from './index.module.scss'

const ProductCard = ({ product }) => {
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
		dispatch(addToCart(id, 1, state.variantID))
		setState(draft => {
			// after adding to card reset options and price
			Object.assign(draft, initialState)
			draft.snack = true
		})
	}, [state.variantID])

	return (
		<div className={`${styles.product_card} px-2`}>
			<div className='shadow-lg rounded-lg'>
				<a href='#'>
					<img src={image.url} className='w-full h-40  object-center object-cover lg:w-full lg:h-72' />
				</a>
				<div className='p-2 lg:p-5'>
					<h3>
						<a href='#'>{name.substring(0, 18)}</a>
					</h3>
					<h2>{price.formatted_with_symbol}</h2>
					{variantFilter}
					{/* TODO: Replace with varint filter */}
					{/* <div className='flex flex-row my-3'>
						<div className='bg-black rounded-full h-5 w-5 shadow-md mr-2'></div>
						<div className='bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2'></div>
						<div className='bg-white rounded-full h-5 w-5 shadow-md mr-2'></div>
						<div className='bg-red-800 rounded-full h-5 w-5 shadow-md mr-2'></div>
						<div className='bg-green-700 rounded-full h-5 w-5 shadow-md mr-2'></div>
					</div>
					<div className='lg:flex-row lg:flex flex-wrap hidden my-3'>
						<a className='border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs' href='#'>
							XL
						</a>
						<a className='border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs' href='#'>
							XXL
						</a>
						<a className='border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs' href='#'>
							L
						</a>
						<a className='border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs' href='#'>
							M
						</a>
						<a className='border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs' href='#'>
							S
						</a>
					</div> */}
					{/* TODO: Replace with varint filter */}
					<div className='flex flex-col justify-between'>
						<Button
							className={`${styles.add_to_cart} bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center`}
							disabled={!state.valid}
							onClick={onAddToCart}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 mr-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
								/>
							</svg>
							Add to cart
						</Button>
						<Link href={`/products/${id}`}>
							<button
								className='bg-purple-600 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-purple-700 flex flex-row justify-center'
								href='#'
							>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
								View Details
							</button>
						</Link>
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
		</div>
	)
}

// TODO: If product inventory is managed and equals 0, show 'sold out' label
// TODO: Move snack out of product cards to the global Layout, manage state on redux level, pass actions as props / children

export default ProductCard
