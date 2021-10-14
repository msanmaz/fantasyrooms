import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import { AddShoppingCart } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

import { addToCart } from 'lib/redux'
import commerce from 'lib/commerce'

import styles from './index.module.scss'

const ProductCard = ({ image, name, price, id, permalink }) => {
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const handleClick = () => {
		setOpen(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	// const { setCart } = useCartDispatch()
	const handleAddToCart = () => {
		dispatch(addToCart(id, 1))
		// commerce.cart.add(id).then(({ cart }) => setCart(cart))
	}

	return (
		<>
			<div className='px-2'>
				<div className='shadow-lg rounded-lg'>
					<a href='#'>
						<img src={image.url} className='w-full h-40  object-center object-cover lg:w-full lg:h-72' />
					</a>
					<div className='p-2 lg:p-5'>
						<h3>
							<a href='#'>{name.substring(0, 18)}</a>
						</h3>
						<h2>{price.formatted_with_symbol}</h2>
						<div className='flex flex-row my-3'>
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
						</div>
						<div className='flex flex-col justify-between'>
							<button
								className='bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center'
								onClick={handleAddToCart}
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
							</button>
							<Link href={`/products/${id}`}>
								<button
									className='bg-purple-600 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-purple-700 flex flex-row justify-center'
									href='#'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 mr-1'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
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
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Product Added To Cart'
				action={
					<>
						<Button color='secondary' size='small' onClick={handleClose}>
							<Link href='/Cart'>
								<IconButton aria-label='Add To Cart'>
									<AddShoppingCart style={{ fill: 'white' }} />
								</IconButton>
							</Link>
						</Button>
						<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
							<CloseIcon fontSize='small' />
						</IconButton>
					</>
				}
			/>
		</>
	)
}

export default ProductCard
