import React from 'react'
import { useState } from 'react'
import commerce from '../lib/commerce'
import { useCartDispatch } from '../context/cart'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';
import Link from 'next/link'


const SecondCard = ({image,name,price,id,permalink}) => {

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const { setCart } = useCartDispatch()


  

    const addToCart = () => {
        commerce.cart.add(id).then(({ cart }) => setCart(cart))
      
    }

    return (
        <>


        <div className="px-2 lg:px-4">
                  <div class="shadow-lg rounded-lg">
        <a href="#">
          <img src={image.url} class="w-full h-40  object-center object-cover lg:w-full lg:h-72" />
        </a>
        <div class="p-2 lg:p-5">
          <h3><a href="#">{name.substring(0,18)}</a></h3>
          <h2>{price.formatted_with_symbol}</h2>
          <div class="flex flex-row my-3">
            <div class="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
            <div class="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
            <div class="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
            <div class="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
            <div class="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
          </div>
          <div class="lg:flex-row lg:flex flex-wrap hidden my-3">
            <a class="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">XL</a>
            <a class="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">XXL</a>
            <a class="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">L</a>
            <a class="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">M</a>
            <a class="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs" href="#">S</a>
          </div>
          <div class="flex flex-col justify-between">
            <button class="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center" onClick={() => { addToCart(); handleClick() }}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
            </button>
            <Link href={`/products/${permalink}`}>
            <button class="bg-purple-600 rounded-full py-2 px-4 my-2 text-xs text-white hover:bg-purple-700 flex flex-row justify-center" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
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
        message="Product Added To Cart"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              <Link href="/Cart">
              <IconButton aria-label="Add To Cart"  >
                <AddShoppingCart  style={{fill: "white"}} />
              </IconButton>
              </Link>

            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        
        </>
        
    )
}

export default SecondCard
