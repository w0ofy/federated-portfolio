const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deps = require('./package.json').dependencies;

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3001/',
    chunkFilename: '[id].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.[jt]sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
          plugins: ['react-refresh/babel'].filter(Boolean),
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: 'navigationApp',
      library: { type: 'var', name: 'navigationApp' },
      filename: 'remoteEntry.js',
      exposes: {
        './Navigation': './src/App',
      },
      remotes: {
        hostApp: 'hostApp',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
  },
};
