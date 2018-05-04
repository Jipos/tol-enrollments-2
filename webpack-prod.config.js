const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const bodyHtmlSnippet = `
    <div class="container-fluid">
      <header></header>
      <main></main>
      <footer></footer>
    </div>`;

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
      'backbone.toledo': path.resolve(__dirname, 'src/backbone.toledo/'),
      'i18n': path.resolve(__dirname, 'src/i18n/')
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
      appMountHtmlSnippet: '  <header></header>\n      <main></main>',
      title: 'Toledo admin tools',
      // Additional settings for the index.html, using html-webpack-template plugin
      meta: [
        {
          name: 'description',
          content: 'Admin tools for your Toledo enrollments.'
        }
      ]
    }),
    // Extract the css snippets into a separate CSS file, loaded using a link element
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader
      //     },
      //     {
      //       loader: "css-loader?sourceMap",
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // },
      // import scss files
      // TODO: KR find a way to extract the css source maps into a separate .map file
      // Debugging the loaders seems to reveal that the source and the sourcemaps are stored separately
      // until the last step (i.e. MiniCssExtractPlugin). So inside the MiniCssExtractPlugin loaders
      // There is an object containing both the source and the sourcemaps. It's not yet clear how this
      // gets transformed into actual files. But it seems that that's where things go wrong.
      // [update] the two seem to get combined by the MiniCssExtractPlugin (the plugin, not the loader)
      // the plugin doesn't seem to provide a way to write the sourcemaps as a separate file.
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                sourceMap: true
            }
          },
          // translates CSS into CommonJS modules
          {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1
            }
          },
          // NOTE: KR an attempt to extract the source maps into a .map file, but it didn't work.
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     parser: require('postcss-scss'), // errors are thrown without this.
          //     sourceMap: 'map'
          //   }
          // },
          // compiles Sass to CSS
          {
            loader: 'sass-loader',
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
