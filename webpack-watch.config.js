const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-dev.config.js');

module.exports = merge(common, {
  // Configure the dev server (which watches changes and provides live-reloading)
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:3000'
    },
    inline: true,
    open: true
  },
  // optimization: {
  //   runtimeChunk: {
  //     name: 'manifest'
  //   },
  //   splitChunks: {
  //       cacheGroups: {
  //           commons: {
  //               test: /[\\/]node_modules[\\/]/,
  //               name: 'vendor',
  //               chunks: 'all'
  //           }
  //       }
  //   }
  // }
});
