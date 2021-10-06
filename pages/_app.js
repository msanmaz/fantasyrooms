import '../styles/tailwind.css'
import { CartProvider, ModalProvider, CheckoutProvider } from '../context'
import React from 'react'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <ModalProvider>
      <CartProvider>
        <CheckoutProvider>
          <Layout>
          <Component {...pageProps} /> 
          </Layout>
        </CheckoutProvider>
      </CartProvider>
    </ModalProvider>


  )
}

export default MyApp
