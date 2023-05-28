const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('inline-source-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inlineSource: 'bundle.js',
    }),
    new InlineSourcePlugin(),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
};
