const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
		index: path.resolve( process.cwd(), 'src', 'index.js' ),
		frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
	},
	devtool: 'source-map',
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.svg$/,
				use: [ '@svgr/webpack', 'url-loader' ],
			},
			{
				test: /\.(sc|sa|c)ss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						},
					},
					{
						loader: 'extract-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require( 'sass' ),
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [ postcssPresetEnv( /* pluginOptions */ ) ],
						},
					},
				],
			},
		],
	},
	plugins: [ ...defaultConfig.plugins ],
};
