const webpack = require('webpack') 
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')


// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || './assets';
__webpack_public_path__ = process.env.ASSET_PATH;
console.log('ASSET_PATH',ASSET_PATH)
module.exports = {
  // mode: 'production',
  mode: 'development',

  // entry: {
  //   index: './src/index.js',
  //   // playList: './src/playList.js',
  //   //publicPath: path.resolve(__dirname, 'src/assets')
  // },
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: './assets/',
    assetModuleFilename: 'assets/[hash][ext][query]',
    // publicPath: ASSET_PATH,
    // clean: true,
    //publicPath: path.resolve(__dirname, 'src/assets')
  },
  devtool: 'inline-source-map',
  devServer: {
    // static: './dist',
    // static: './assets',
    // static: {
    //   directory: path.join(__dirname, 'assets'),
    // },
    static: { 
      directory: path.resolve(__dirname, './public'), 
      publicPath: '/public'
    },
    watchFiles: path.join(__dirname, 'src'),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Development',
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
  module: {
    rules: [
    //   {    test: /\.(mp3|aac|ogg)$/,
    //   loader: 'file-loader'
    // },
    {
      test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
      type: 'asset/resource',
    },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },{
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  // entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   clean: true,
  // },

  optimization: {
    runtimeChunk: 'single',
  },
};