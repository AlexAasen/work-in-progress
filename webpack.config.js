'use strict';
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )

const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')
const CSS_DIR = path.resolve(__dirname, 'src/scss')

const alias = require('./alias')

module.exports = (env, argv) => {
  //const development = argv.mode === 'development'
  const development = true

  const babelLoader = {
    test: /\.(js|jsx)$/,
    include: APP_DIR,
    exclude: /node_modules/,
    use: [
      { loader: 'babel-loader', options: { sourceMap: development } },
      { loader: 'eslint-loader' }
    ]
  }

  const sassOptions = {
    development: [
      { loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } },
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } }
    ],
    production: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
  }
  const sassLoader = {
    test: /\.(sa|sc|c)ss$/,
    include: CSS_DIR,
    exclude: /node_modules/,
    use: sassOptions[argv.mode]
  }

  const reactDOMExpose = {
    test: require.resolve('react-dom'),
    use: [{
      loader: 'expose-loader',
      options: 'ReactDOM'
    }]
  }
  const reactExpose = {
    test: require.resolve('react'),
    use: [{
      loader: 'expose-loader',
      options: 'React'
    }]
  }

  const extensions = ['.js', '.jsx', '.scss', '.css', ".json"]

  const plugins = [
    new CleanWebpackPlugin([DIST_DIR + '/**/*.*']),
    new MiniCssExtractPlugin({
      filename: "[name]-bundle.css"
    })
  ]

  if (argv['simple-progress'] === "true")
    plugins.push(new SimpleProgressWebpackPlugin())

  return {
    entry: {
      app: APP_DIR + '/jsx/index',
      css: CSS_DIR + '/main'
    },
    devtool: development ? 'inline-source-map' : false,
    output: {
      path: DIST_DIR,
      filename: '[name]-bundle.js',
      libraryTarget: 'this'
    },
    target: 'web',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            test: /\.(sa|sc|c)ss$/,
            name: 'css',
            chunks: 'all',
            enforce: true
          }
        }
      } //No need for a minimizer, webpack uses uglifyjsWebpackPlugin by defualt in production
    },
    module: {
      rules: [babelLoader, sassLoader, reactExpose, reactDOMExpose]
    },
    resolve: Object.assign({}, {
      modules: [path.join(__dirname, 'node_modules')],
      extensions: extensions
    }, alias.resolve),
    plugins: plugins
  }
}
