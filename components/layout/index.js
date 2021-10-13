import Head from 'next/head'
import Navbar from 'components/Navbar'
import styles from './index.module.scss'

const Layout = ({ Component, pageProps }) => {
	// If a page will export a static property 'title' it will be added to the website title
	const { title } = pageProps
	let combined_title = `The Fantasy Rooms`
	if (title) combined_title += ` - ${title}`

	return (
		<div className={styles.layout}>
			<Head>
				<title>{combined_title}</title>
			</Head>
			<Navbar />
			<Component {...pageProps} />
		</div>
	)
}

export default Layout
