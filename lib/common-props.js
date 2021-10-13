// import { wrapper } from 'lib/store'
// import { COMMON_PROPS, setServerState } from 'lib/reducer'
import { wrapper, COMMON_PROPS, setServerState } from 'lib/redux'
import { readCache } from 'lib/cache'

const commonProps = async store => {
	// read cache from file ({products, categories, merchant})
	const cache = await readCache()

	// take the data common to all generated pages (just merchant and categories)
	const common = { ...cache }

	// we remove products from common props because it's usually huge and is definitely not used in Layout
	delete common.products

	// dispatch common props to server store
	// this is needed so that the Layout component will also have access to the common props
	store.dispatch(setServerState(common))

	return cache
}

export default commonProps

// const commonStaticProps = (callback, ...keys) =>
// 	wrapper.getStaticProps(store => async context => {

// 		// callback is a page specific getStaticProps implementation we optionally wrap around
// 		// if callback is provided, we call it with context and cache and return what it returns, adding our common props in
// 		if (callback) {
// 			const pageProps = await callback(context, cache)
// 			pageProps.props = { ...pageProps.props, common }
// 			return pageProps
// 		}

// 		// otherwise we only return the common props
// 		return {
// 			props: common,
// 		}
// 	})

// export default commonStaticProps
