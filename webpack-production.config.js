const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-common.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// NOTE: KR the optimizer also removes duplicate styles.
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  // Set the mode to 'production', enabling some production settings
  mode: 'production',
  // Enable source maps (outputted as an external file)
  devtool: 'source-map',
  // group node_modules dependencies in vendor.js file
  optimization: {
      splitChunks: {
          cacheGroups: {
              commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  chunks: 'all'
              }
          }
      }
  },
  // Define the output filenames (JS)
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // Minify the JS output and add source maps
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    // Extract the css snippets into a separate CSS file, loaded using a link element
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  }
});
