const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // Set the mode to 'production', enabling some production settings
  mode: 'production',
  // Define the entry points (JS)
  entry: {
    app: './src/index.js'
  },
  // Enable source maps (outputted as an external file)
  devtool: 'source-map',
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/lib/'),
      entities: path.resolve(__dirname, 'src/entities/')
    }
  },
  // Optimize the output
  optimization: {
    splitChunks: {
      cacheGroups: {
        //group node_modules dependencies in vendor.js file
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  // Define the output filenames (JS)
  output: {
    filename: '[name].[chunkhash].js'
    // path: path.resolve(__dirname, 'dist')
  },
  performance: {
    hints: "warning"
  },
  plugins: [
    // Clear the dist folder each build
    new CleanWebpackPlugin(['dist']),
    // Generate the index.html page
    new HtmlWebpackPlugin({
      // Enable the html-webpack-template plugin, for generating a richer index.html
      inject: false,
      template: require('html-webpack-template'),
      // Additional settings for the index.html, using html-webpack-template plugin
      appMountId: 'app',
      appMountHtmlSnippet: '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true">Loading</i></div>',
      headHtmlSnippet: '<style>div.app-spinner {position: fixed;top:50%;left:50%;}</style >',
      bodyHtmlSnippet: '<custom-element></custom-element>',
      title: 'tol-enrollments',
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ]
    }),
    // Extract the css snippets into a separate CSS file, loaded using a link element
    new MiniCssExtractPlugin(),
    // Minify the CSS assets (removing duplicate and grouping similar styles)
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { sourcemap: true },
      canPrint: true
    })
  ],
  module: {
    rules: [
      // Don't expose global variables
      {
        parser: { amd: false }
      },
      // Transpile ES6 code
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: 'babel-loader',
        query: {
           presets: ['es2015']
        }
      },
      // import css files
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader},
          {
            loader: "css-loader?sourceMap",
            options: {
              sourceMap: true
            }
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
