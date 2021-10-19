import { useState, useMemo } from 'react'
import commerce from 'lib/commerce'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { changeItemQuantity, removeFromCart, selectCart, selectModal, setModal } from 'lib/redux'

import styles from './index.module.scss'

const Cart = ({ props }) => {
	const dispatch = useDispatch()

	const { subtotal, line_items,id } = useSelector(selectCart)

	const modal = useSelector(selectModal)

	const cls = useMemo(
		() => `z-50 transform top-0 right-0 w-full fixed h-full overflow-auto ease-in-out rounded-l-xl transition-all duration-700 "
	${modal ? 'translate-x-0 visible' : 'translate-x-full'}`,
		[modal]
	)

	const handleUpdateCartQty = (productId, quantity) => {
		dispatch(changeItemQuantity(productId, quantity))
	}

	const handleRemoveFromCart = productId => {
		dispatch(removeFromCart(productId))
	}

	return (
		<aside className={cls}>
			<div className='overflow-hidden'>
				{/* <!--
					Background overlay, show/hide based on slide-over state.
					Entering: "ease-in-out duration-500"
					From: "opacity-0"
					To: "opacity-100"
					Leaving: "ease-in-out duration-500"
					From: "opacity-100"
					To: "opacity-0"
				--> */}

				<div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
					{/* <!--
  						Slide-over panel, show/hide based on slide-over state.
  						Entering: "transform transition ease-in-out duration-500 sm:duration-700"
  						From: "translate-x-full"
  						To: "translate-x-0"
  						Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
  						From: "translate-x-0"
  						To: "translate-x-full"
  						--> */}
					<div className='w-screen max-w-md'>
						<div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
							<div className='flex-1 py-6 overflow-y-auto px-4 sm:px-6'>
								<div className='flex items-start justify-between'>
									<h2 className='text-lg font-medium text-gray-900' id='slide-over-title'>
										Shopping cart
									</h2>
									<div className='ml-3 h-7 flex items-center'>
										<button
											type='button'
											className='-m-2 p-2 text-gray-400 hover:text-gray-500'
											onClick={() => dispatch(setModal(0))}
										>
											<span className='sr-only'>Close panel</span>
											<svg
												className='h-6 w-6'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												aria-hidden='true'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</button>
									</div>
								</div>

								<div className='mt-8'>
									<div className='flow-root'>
										<ul role='list' className='-my-6 divide-y divide-gray-200'>
											{line_items?.map(item => (
												<li className='py-6 flex' key={item.id}>
													<div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
														<img
															src={item.image.url}
															alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
															className='w-full h-full object-center object-cover'
														/>
													</div>

													<div className='ml-4 flex-1 flex flex-col'>
														<div>
															<div className='flex justify-between text-base font-medium text-gray-900'>
																<h3>
																	<a href='#'>{item.name}</a>
																</h3>
																<p className='ml-4'>{item.line_total.formatted_with_symbol}</p>
															</div>
															<p className='mt-1 text-sm text-gray-500'></p>
														</div>
														<div className='flex-1 flex items-end justify-between text-sm'>
															<button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
																-
															</button>
															<p className='text-gray-500'>{item.quantity}</p>
															<button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
																+
															</button>

															<div className='flex'>
																<button
																	type='button'
																	className='font-medium text-indigo-600 hover:text-indigo-500'
																	onClick={() => handleRemoveFromCart(item.id)}
																>
																	Remove
																</button>
															</div>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>

							<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
								<div className='flex justify-between text-base font-medium text-gray-900'>
									<p>Subtotal</p>
									<div className='subtotal_value'>{subtotal?.formatted_with_symbol || '---'}</div>
								</div>
								<p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
								<Link href={`/checkout/${id}`} className='mt-6'>
									<div className='flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'>
										Checkout
									</div>
								</Link>
								<div className='mt-6 flex justify-center text-sm text-center text-gray-500'>
									<p>
										or{' '}
										<button type='button' className='text-indigo-600 font-medium hover:text-indigo-500'>
											Continue Shopping<span aria-hidden='true'> &rarr;</span>
										</button>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Cart
