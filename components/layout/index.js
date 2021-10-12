import Head from 'next/head'

import Navbar from 'components/Navbar'


export const Layout = ({ children }) => (
    <div className="bg-white">
        <Head>
            <title>The Fantasy Rooms</title>
        </Head>
        <Navbar/>

        {children}
    </div>
)

export default Layout