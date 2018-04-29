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
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
      entities: path.resolve(__dirname, 'src/entities/')
    }
  },
  plugins: [
    // Clear the dist folder each build (to avoid issues with left over files)
    new CleanWebpackPlugin(['dist']),
    // Generate the index.html page
    new HtmlWebpackPlugin({
      // Enable the html-webpack-template plugin, for generating a richer index.html
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      appMountHtmlSnippet: '  <header></header>\n      <main></main>',
      title: 'Toledo admin tools',
      // Additional settings for the index.html, using html-webpack-template plugin
      meta: [
        {
          name: 'description',
          content: 'Admin tools for your Toledo enrollments.'
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
