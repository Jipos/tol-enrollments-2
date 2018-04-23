const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // Set the mode to 'development', enabling some development settings
  mode: 'development',
  // Define the entry points (JS)
  entry: {
    app: './src/index.js'
  },
  // Enable source maps (outputted as an external file, but evaluated each time for speed)
  devtool: 'eval-source-map',
  plugins: [
    // Clear the dist folder each build (to avoid issues with left over files)
    new CleanWebpackPlugin(['dist']),
    // Generate the index.html page
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      // Transpile ES6 code
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: 'babel-loader',
        query: {
           presets: ['es2015']
        }
      },
      // load css snippets as separate style elements
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attrs: {component: "[name]@[version]"}
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      // import images (and handle references to them in HTML and CSS files)
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // import fonts (and handle references to them in HTML and CSS files)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
