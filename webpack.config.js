const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'docs')

const NODE_ENV = process.env.NODE_ENV


const config = {
	stats: {
		hash: false,
		colors: true,
		chunks: false,
		version: false,
		children: false,
		timings: true
	},
	devServer: {
		host: '0.0.0.0',
		port: 3000,
		publicPath: '/dist' //模板、样式、脚本、图片等资源对应server上的路径
	},
	entry: {
		index: [SRC_PATH]
	},
	output: {
		path: DIST_PATH, //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
		publicPath: './', //模板、样式、脚本、图片等资源对应的的路径
		filename: 'js/[name].js' //每个页面对应的主js的生成配置
	},
	resolve: {
		alias: {
			src: SRC_PATH,
			vue: 'vue/dist/vue.js'
		},
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					scss: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: 'css-loader!sass-loader'
					})
				}
			}
		}, {
			test: /\.s?css$/,
			loader: ExtractTextPlugin.extract({
				fallback: 'vue-style-loader',
				use: 'css-loader!sass-loader'
			})
		}, {
			test: /\.(jpg|png)$/,
			loader: 'url-loader?name=images/[name].[ext]&limit=51200'
		}, {
			test: /\.(eot|svg|ttf|woff(2)?)(\?[a-z0-9=\.]+)?$/,
			loader: 'url-loader?name=fonts/[name].[ext]&limit=1000'
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	]
}

//多文件入口，html模版生成
for (const name of Object.keys(config.entry)) {
	if (name !== 'lib') {
		config.plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
			// favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
			title: name,
			chunks: [name, 'lib'], //需要引入的chunk，不配置就会引入所有页面的资源
			template: path.resolve(SRC_PATH, 'template.html'),
			filename: './' + name + '.html', //生成的html存放路径，相对于path
			inject: 'body', //js插入的位置，true/'head'/'body'/false
			hash: true, //为静态资源生成hash值
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}))
	}
}

if (NODE_ENV === 'development') {
	config.watch = true
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

if (NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { discardComments: {removeAll: true } },
			canPrint: true
		})
	)
	config.externals = {
		vue: 'Vue'
	}
}

module.exports = config
