const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // Define the entry points (JS)
  entry: {
    app: './src/index.js'
  },
  plugins: [
    // Clear the dist folder each build
    new CleanWebpackPlugin(['dist']),
    // Generate the index.html page
    new HtmlWebpackPlugin({
      // Enable the html-webpack-template plugin, for generating a richer index.html
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true">Loading</i></div>',
      headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
      bodyHtmlSnippet: '<custom-element></custom-element>',
      title: 'Output Management',
      // Additional settings for the index.html, using html-webpack-template plugin
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ]
    })
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
