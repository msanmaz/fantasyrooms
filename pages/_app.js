import { wrapper } from 'lib/redux'
import Layout from '../components/layout/index.js'
import 'styles/globals.scss'

const App = ({ Component, pageProps }) => <Layout Component={Component} pageProps={pageProps} />

const withRedux = wrapper.withRedux(App, { debug: false })

export default withRedux
