const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-common.config.js');

module.exports = merge(common, {
  // Set the mode to 'development', enabling some development settings
  mode: 'development',
  // Enable source maps (outputted as an external file, but evaluated each time for speed)
  devtool: 'eval-source-map',
  // Configure the dev server (which watches changes and provides live-reloading)
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:3000'
    },
    hot: true,
    inline: true,
    open: true
  },
  // Define the output filenames (JS)
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: '/'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
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
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // load css snippets as separate style elements
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
});
