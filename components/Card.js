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



function Card({image,name,price,id,permalink}) {
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
            <div className="relative " style={{'height': '80%'}}>
                <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden  lg:h-80 ">

                    <img src={image.url}
                        alt="Front of men&#039;s Basic Tee in black." className="w-full h-full  object-center object-cover lg:w-full lg:h-full" />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                          
                                {name}
                        </h3>

                    </div>
                    <p className="text-sm font-medium text-gray-900">{price.formatted_with_symbol}</p>
                </div>



                <div className="flex flex-col space-x-2">
        <div className="w-full">
        <button className="group bg-gray-400 mb-2 flex hover:bg-gray-100 hover:text-black justify-center w-full text-base text-white font-bold py-2 px-2 rounded-lg" onClick={() => { addToCart(); handleClick() }}>
                        <svg className="flex-shrink-0 h-6 w-6 text-white mx-2 group-hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add To Cart
                    </button>
                    <Link href={`/products/${permalink}`}>
                    <button className="bg-gray-400 w-full hover:bg-gray-100 hover:text-black flex justify-center text-white font-bold py-2 px-4 text-base rounded-lg">
                        Details
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

export default Card
