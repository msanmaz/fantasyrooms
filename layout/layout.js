import React from 'react';
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { commerce } from '../lib/commerce'
import { useCartState, useCartDispatch } from '../context/cart'



  

export default function Layout({ children }) {

    const { line_items,id} = useCartState()


    return (

        <div className="bg-white">
            <Head>
                <title>The Fantasy Rooms</title>

            </Head>
           
            <Navbar totalItems={line_items.length} line_items={line_items}  />


            {children}



        </div>

    )
}