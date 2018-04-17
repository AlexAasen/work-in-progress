var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist/js/');
var APP_DIR = path.resolve(__dirname, 'src/');
var CSS_DIR = path.resolve(__dirname, 'src/scss/');

var config = {
  entry: [APP_DIR + '/jsx/index.jsx', CSS_DIR + '/main.scss'],
  output: {
    path: BUILD_DIR,
    filename: 'main.js',
    publicPath: '/'
  },
  target : 'node',
  devtool: "source-map",
  module: {
    rules: [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: CSS_DIR,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/bundle.css'),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
     // ...
  })
  ],
  resolve: {
    alias: {
      js: path.resolve(APP_DIR + "/js"),
      scss: path.resolve(APP_DIR + "/scss"),
      jsx: path.resolve(APP_DIR + "/jsx"),
      constants: path.resolve(APP_DIR + "/constants"),
      img: path.resolve(APP_DIR + "/img"),
      common: path.resolve(APP_DIR + "/jsx/common"),
      graphs: path.resolve(APP_DIR + "/jsx/common/graphs"),
      dist: path.resolve(__dirname, '/dist'),
      src: path.resolve(__dirname, '/src')
    }
  }
};

module.exports = config;
