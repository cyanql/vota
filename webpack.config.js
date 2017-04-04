const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'docs')

const NODE_ENV = process.env.NODE_ENV

const APP_NAME = 'VotA'


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
        hot: true,
        inline: true,
		host: '0.0.0.0',
		port: 3000,
		publicPath: '/' //模板、样式、脚本、图片等资源对应server上的路径
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
			vue: 'vue/dist/vue.js',
			vuex: 'vuex/dist/vuex.js',
			'vue-router': 'vue-router/dist/vue-router.js'
		},
        mainFiles: ['index', 'index.vue'],
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(jpg)$/,
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
		}),
        new FaviconsWebpackPlugin({
            // Your source logo
            logo: path.resolve(__dirname, 'src/vota.png'),
            // The prefix for all image files (might be a folder or a name)
            prefix: 'favicons/',
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            statsFilename: 'faviconstats.json',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#000',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'VotA',
            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
              android: true,
              appleIcon: true,
              appleStartup: true,
              coast: false,
              favicons: false,
              firefox: false,
              opengraph: false,
              twitter: false,
              yandex: false,
              windows: false
            }
          })
	]
}

//多文件入口，html模版生成
for (const name of Object.keys(config.entry)) {
	if (name !== 'lib') {
		config.plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: path.resolve(__dirname, 'src/favicon.ico'),
			title: 'VotA',
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
	config.devtool = 'inline-source-map'//'cheap-module-eval-source-map'
    config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                scss: 'vue-style-loader!css-loader!sass-loader'
            }
        }
    }, {
        test: /\.s?css$/,
        loader: 'vue-style-loader!css-loader!sass-loader'
    })
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
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter'
	}
    config.module.rules.push({
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
    })
}

module.exports = config
