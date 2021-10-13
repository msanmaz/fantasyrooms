const path = require('path')

module.exports = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
}
