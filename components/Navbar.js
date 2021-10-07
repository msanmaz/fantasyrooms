import React from 'react'
import { useState, useEffect } from 'react'
import {useRef} from "react"
import onClickOutside from "react-onclickoutside";
import Link from 'next/link'
import { useCartState, useCartDispatch } from '../context/cart'
import commerce from '../lib/commerce'





export const Navbar = ({totalItems,line_items}) => {
  const { id } = useCartState()
console.log(totalItems)

    const [isOpen, setIsOpen] = useState(true);
    const [isDrop, setIsDrop] = useState(false);
    const [isDropMen, setIsDropMen] = useState(false);

    const [isSideBar, setIsSideBar] = useState(false);

 


  

    const toggle = () => setIsDrop(!isDrop);
    

    
    Navbar.handleClickOutside = () => setIsDrop(false);

    const ref = useRef()


    const refTwo = useRef()

  
    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isDropMen && ref.current && !ref.current.contains(e.target)) {
            setIsDropMen(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [isDropMen])

        
    useEffect(() => {
      const checkIfClickedOutside = e => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (isSideBar && refTwo.current && !refTwo.current.contains(e.target)) {
          setIsSideBar(false)
        }
      }
  
      document.addEventListener("mousedown", checkIfClickedOutside)
  
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }, [isSideBar])

    const { setCart } = useCartDispatch()
    const handleUpdateCart = ({ cart }) => setCart(cart)

    const handleUpdateCartQty =  (productId,quantity) => {
       commerce.cart.update(productId, { quantity}).then(handleUpdateCart)
    }
  
    const handleRemoveFromCart =  (productId) => {
      commerce.cart.remove(productId).then(handleUpdateCart)  
      }



    return (

      <>
        
        <div className="bg-white w-full sticky top-0 z-30">

            <div className ={`fixed inset-0  z-40 ${isOpen ? 'hidden' : 'flex'}` } role="dialog" aria-modal="true">

            <div className ="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>


            <div className ="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className ="px-4 pt-5 pb-2 flex">
            <button type ="button" className ="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-800"  onClick={() => setIsOpen(!isOpen)}>
            <span className ="sr-only">Close menu</span>
            <svg className ="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            </div>

            <div className ="mt-2">
            <div className ="border-b border-gray-200">
            <div className ="-mb-px flex px-4 space-x-8" aria-orientation="horizontal" role="tablist">
            <button id="tabs-1-tab-1" className ="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type ="button" >
            Women
            </button>

            <button id="tabs-1-tab-2" className ="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium" aria-controls="tabs-1-panel-2" role="tab" type ="button">
            Men
            </button>
            </div>
            </div>

            <div id="tabs-1-panel-1" className ="pt-10 pb-8 px-4 space-y-10" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabIndex="0">
            <div className ="grid grid-cols-2 gap-x-4">
            <div className ="group relative text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            New Arrivals
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>

            <div className ="group relative text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg" alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            Basic Tees
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>
            </div>

            <div>
            <p id="women-clothing-heading-mobile" className ="font-medium text-gray-900">
            Clothing
            </p>
            <ul role="list" aria-labelledby="women-clothing-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Tops
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Dresses
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Pants
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Denim
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Sweaters
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            T-Shirts
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Jackets
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Activewear
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Browse All
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="women-accessories-heading-mobile" className ="font-medium text-gray-900">
            Accessories
            </p>
            <ul role="list" aria-labelledby="women-accessories-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Watches
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Wallets
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Bags
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Sunglasses
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Hats
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Belts
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="women-brands-heading-mobile" className ="font-medium text-gray-900">
            Brands
            </p>
            <ul role="list" aria-labelledby="women-brands-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Full Nelson
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            My Way
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Re-Arranged
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Counterfeit
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Significant Other
            </a>
            </li>
            </ul>
            </div>
            </div>

            <div id="tabs-1-panel-2" className ="pt-10 pb-8 px-4 space-y-10" aria-labelledby="tabs-1-tab-2" role="tabpanel" tabIndex="0">
            <div className ="grid grid-cols-2 gap-x-4">
            <div className ="group relative text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg" alt="Drawstring top with elastic loop closure and textured interior padding." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            New Arrivals
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>

            <div className ="group relative text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg" alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            Artwork Tees
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>
            </div>

            <div>
            <p id="men-clothing-heading-mobile" className ="font-medium text-gray-900">
            Clothing
            </p>
            <ul role="list" aria-labelledby="men-clothing-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Tops
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Pants
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Sweaters
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            T-Shirts
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Jackets
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Activewear
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Browse All
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="men-accessories-heading-mobile" className ="font-medium text-gray-900">
            Accessories
            </p>
            <ul role="list" aria-labelledby="men-accessories-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Watches
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Wallets
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Bags
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Sunglasses
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Hats
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Belts
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="men-brands-heading-mobile" className ="font-medium text-gray-900">
            Brands
            </p>
            <ul role="list" aria-labelledby="men-brands-heading-mobile" className ="mt-6 flex flex-col space-y-6">
            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Re-Arranged
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Counterfeit
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            Full Nelson
            </a>
            </li>

            <li className ="flow-root">
            <a href="#" className ="-m-2 p-2 block text-gray-500">
            My Way
            </a>
            </li>
            </ul>
            </div>
            </div>
            </div>

            <div className ="border-t border-gray-200 py-6 px-4 space-y-6">
            <div className ="flow-root">
            <a href="#" className ="-m-2 p-2 block font-medium text-gray-900">Company</a>
            </div>

            <div className ="flow-root">
            <a href="#" className ="-m-2 p-2 block font-medium text-gray-900">Stores</a>
            </div>
            </div>

            <div className ="border-t border-gray-200 py-6 px-4 space-y-6">
            <div className ="flow-root">
            <a href="#" className ="-m-2 p-2 block font-medium text-gray-900">Sign in</a>
            </div>
            <div className ="flow-root">
            <a href="#" className ="-m-2 p-2 block font-medium text-gray-900">Create account</a>
            </div>
            </div>

            <div className ="border-t border-gray-200 py-6 px-4">
            <a href="#" className ="-m-2 p-2 flex items-center">
            <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" className ="w-5 h-auto block flex-shrink-0"/>
            <span className ="ml-3 block text-base font-medium text-gray-900">
            CAD
            </span>
            <span className ="sr-only">, change currency</span>
            </a>
            </div>
            </div>
            </div>

            <header className ="relative bg-white">
            <p className ="bg-pink-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            Get free delivery on orders over $100
            </p>

            <nav aria-label="Top" className ="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className ="border-b border-gray-200">
            <div className ="h-16 flex items-center">
        {/* Mobile menu toggle, controls the 'mobileMenuOpen' state. */}
            <button type ="button" className ="bg-white p-2 rounded-md text-gray-400 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <span className ="sr-only">Open menu</span>
        {/* <!-- Heroicon name: outline/menu --> */}
            <svg className ="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>

            <div className ="ml-4 flex lg:ml-0">
            <a href="#">
            <span className ="sr-only">Workflow</span>
            <img className ="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt=""/>
            </a>
            </div>

            <div className ="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className ="h-full flex space-x-8">
            <div className ="flex">
            <div className ="relative flex">
        {/* <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" --> */}
            <button type ="button" className ="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" aria-expanded="false" onClick={() => setIsDrop(!isDrop)} >
            Women
            </button>
            </div>

        {/* <!--
                  'Women' flyout menu, show/hide based on flyout menu state.

                  Entering: "transition ease-out duration-200"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "transition ease-in duration-150"
                    From: "opacity-100"
                    To: "opacity-0"
                --> */}
            <div className ="absolute top-full inset-x-0 text-sm text-gray-500">
        {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
            <div className ="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

            <div className ={`bg-white z-30	 ${isDrop ? 'relative' : 'hidden'} `} onClick={toggle}>
            <div className ="max-w-7xl mx-auto px-8">
            <div className ="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
            <div className ="col-start-2 grid grid-cols-2 gap-x-8">
            <div className ="group relative text-base sm:text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            New Arrivals
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>

            <div className ="group relative text-base sm:text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg" alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            Basic Tees
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>
            </div>
            <div className ="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
            <div>
            <p id="Clothing-heading" className ="font-medium text-gray-900">
            Fantasy Clothing
            </p>
            <ul role="list" aria-labelledby="Clothing-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <Link href="/categories/harness" className ="hover:text-gray-800">
            Harness
            </Link>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Body Stocking
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Garter
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
           Fantasy Costums
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
           Leather & Latex
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Fantasy Bustier
            </a>
            </li>



            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Browse All
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="Accessories-heading" className ="font-medium text-gray-900">
            Toys
            </p>
            <ul role="list" aria-labelledby="Accessories-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Vibrator
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Dildo
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Anal Products
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Sex Toys
            </a>
            </li>

  

            </ul>
            </div>

            <div>
            <p id="Brands-heading" className ="font-medium text-gray-900">
            Brands
            </p>
            <ul role="list" aria-labelledby="Brands-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Full Nelson
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            My Way
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Re-Arranged
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Counterfeit
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Significant Other
            </a>
            </li>
            </ul>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            <div className ="flex">
            <div className ="relative flex">
        {/* <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" --> */}
            <button type ="button" className ="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" aria-expanded="false"  onClick={() => setIsDropMen(oldState => !oldState)}>
            Men
            </button>
            </div>

        {/* <!--
                  'Men' flyout menu, show/hide based on flyout menu state.

                  Entering: "transition ease-out duration-200"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "transition ease-in duration-150"
                    From: "opacity-100"
                    To: "opacity-0"
                --> */}
            <div className ="absolute top-full inset-x-0 text-sm text-gray-500"  ref={ref}>
        {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
            <div className ="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

            <div className ={`bg-white z-30	 ${isDropMen ? 'relative' : 'hidden'} `}>
            <div className ="max-w-7xl mx-auto px-8">
            <div className ="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
            <div className ="col-start-2 grid grid-cols-2 gap-x-8">
            <div className ="group relative text-base sm:text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg" alt="Drawstring top with elastic loop closure and textured interior padding." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            New Arrivals
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>

            <div className ="group relative text-base sm:text-sm">
            <div className ="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
            <img src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg" alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt." className ="object-center object-cover"/>
            </div>
            <a href="#" className ="mt-6 block font-medium text-gray-900">
            <span className ="absolute z-10 inset-0" aria-hidden="true"></span>
            Artwork Tees
            </a>
            <p aria-hidden="true" className ="mt-1">Shop now</p>
            </div>
            </div>
            <div className ="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
            <div>
            <p id="Clothing-heading" className ="font-medium text-gray-900">
            Clothing
            </p>
            <ul role="list" aria-labelledby="Clothing-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Tops
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Pants
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Sweaters
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            T-Shirts
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Jackets
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Activewear
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Browse All
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="Accessories-heading" className ="font-medium text-gray-900">
            Accessories
            </p>
            <ul role="list" aria-labelledby="Accessories-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Watches
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Wallets
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Bags
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Sunglasses
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Hats
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Belts
            </a>
            </li>
            </ul>
            </div>

            <div>
            <p id="Brands-heading" className ="font-medium text-gray-900">
            Brands
            </p>
            <ul role="list" aria-labelledby="Brands-heading" className ="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Re-Arranged
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Counterfeit
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            Full Nelson
            </a>
            </li>

            <li className ="flex">
            <a href="#" className ="hover:text-gray-800">
            My Way
            </a>
            </li>
            </ul>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            <a href="#" className ="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Company</a>

            <a href="#" className ="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Stores</a>
            </div>
            </div>

            <div className ="ml-auto flex items-center">


            <div className ="hidden lg:ml-8 lg:flex">
            <a href="#" className ="text-gray-700 hover:text-gray-800 flex items-center">
            <img src="/EUR.png" alt="" className ="w-5 h-auto block flex-shrink-0"/>
            <span className ="ml-3 block text-sm font-medium">
            EUR
            </span>
            <span className ="sr-only">, change currency</span>
            </a>
            </div>

            <div className ="flex lg:ml-6">
            <a href="#" className ="p-2 text-gray-400 hover:text-gray-500">
            <span className ="sr-only">Search</span>
            <svg className ="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </a>
            </div>

            <div className ="ml-4 flow-root lg:ml-6" onClick={() => setIsSideBar(oldState => !oldState)}>
            <a href="#" className ="group -m-2 p-2 flex items-center">
            <svg className ="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className ="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalItems}</span>
            <span className ="sr-only">items in cart, view bag</span>
            </a>
            </div>
            </div>
            </div>
            </div>
            </nav>
            </header>
        </div>


        <aside
                            className={`z-50 transform top-0 right-0 w-full fixed h-full overflow-auto ease-in-out rounded-l-xl transition-all duration-700 "
                                    ${isSideBar ? 'translate-x-0 visible' : 'translate-x-full invisible'}`}>
                                      <div className="overflow-hidden">
  {/* <!--
    Background overlay, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}

  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
    {/* <!--
      Slide-over panel, show/hide based on slide-over state.

      Entering: "transform transition ease-in-out duration-500 sm:duration-700"
        From: "translate-x-full"
        To: "translate-x-0"
      Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
        From: "translate-x-0"
        To: "translate-x-full"
    --> */}
    <div className="w-screen max-w-md">
      <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
              Shopping cart
            </h2>
            <div className="ml-3 h-7 flex items-center">
              <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setIsSideBar(oldState => !oldState)}>
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">


              {line_items.map((item) => (
                 <li className="py-6 flex" key={item.id}>
                 <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                   <img src={item.image.url} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="w-full h-full object-center object-cover"/>
                 </div>

                 <div className="ml-4 flex-1 flex flex-col">
                   <div>
                     <div className="flex justify-between text-base font-medium text-gray-900">
                       <h3>
                         <a href="#">
                          {item.name}
                         </a>
                       </h3>
                       <p className="ml-4">
                         {item.line_total.formatted_with_symbol}
                       </p>
                     </div>
                     <p className="mt-1 text-sm text-gray-500">
                     </p>
                   </div>
                   <div className="flex-1 flex items-end justify-between text-sm">

                     <button onClick={() => handleUpdateCartQty(item.id, item.quantity -1)}>-</button>
                     <p className="text-gray-500">
                        {item.quantity}
                     </p>
                     <button onClick={() => handleUpdateCartQty(item.id, item.quantity +1)}>+</button>


                     <div className="flex">
                       <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"  onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                     </div>
                   </div>
                 </div>
               </li>

      ))}
               

              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            {/* <p>{subtotal.formatted_with_symbol}</p> */}
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <Link href={`/checkout/${id}`} className="mt-6">
            <div  className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Checkout</div>
          </Link>
          <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              or <button type="button" className="text-indigo-600 font-medium hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</aside>  

        </>
    )
}


const clickOutsideConfig = {
    handleClickOutside: () => Navbar.handleClickOutside
  };


export default onClickOutside(Navbar, clickOutsideConfig);


