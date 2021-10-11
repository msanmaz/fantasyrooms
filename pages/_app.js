import Layout from 'components/layout'
import { CartProvider, ModalProvider, CheckoutProvider } from 'lib/context'
import 'styles/tailwind.css'

const App = ({ Component, pageProps }) => (
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

export default App
