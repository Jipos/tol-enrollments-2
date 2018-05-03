const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-dev.config.js');
const path = require('path');

module.exports = merge(common, {
  // Configure the dev server (which watches changes and provides live-reloading)
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:3000'
    },
    inline: true,
    open: true
  }
});
