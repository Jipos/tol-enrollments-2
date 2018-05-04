const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

class ReuseImportsBetweenEntrypointsPlugin {
  apply(compiler) {
    // TODO: KR DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    compiler.plugin('compilation', function(compilation) {
      compilation.mainTemplate.hooks.localVars.tap("SharedLocalVars", (source, chunk, hash) => {
        // NOTE: KR this patch expects the 'this' to be the browser window.
        // If this changes at any point (e.g. after a webpack update), this Plugin might stop working.
        return source + "\n\n// PATCH: KR Use a shared instead of a local module cache\n" +
               "var installedModules = this['webpackInstalledModules'] = this['webpackInstalledModules'] || {};";
      });
    });
  }
}

module.exports = {
  // Set the mode to 'development', enabling some development settings
  mode: 'development',
  // Define the entry points (JS)
  entry: {
    app: './src/index.js',
    mockdata: './src/mockdata/index.js',
    development: './src/development.js'
  },
  // Enable source maps (outputted as an external file, but evaluated each time for speed)
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'backbone.toledo': path.resolve(__dirname, 'src/backbone.toledo/'),
      'i18n': path.resolve(__dirname, 'src/i18n/')
    }
  },
  plugins: [
    // NOTE: KR Necessary for adding the mockData as a separate entrypoint which uses the same jQuery
    // instance as the app entrypoint.
    new ReuseImportsBetweenEntrypointsPlugin(),
    // Clear the dist folder each build (to avoid issues with left over files)
    new CleanWebpackPlugin(['dist']),
    // Generate the index.html page
    new HtmlWebpackPlugin({
      // Enable the html-webpack-template plugin, for generating a richer index.html
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: '  <header></header>\n      <main></main>',
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
      // import handlebars templates
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
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
      },
      // load css snippets as separate style elements
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader'
      //     }
      //   ]
      // },
      // load scss snippets as separate style elements
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
          },
          // translates CSS into CommonJS modules
          {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
          },
          //
          // {
          //   loader: 'resolve-url-loader'
          // },
          // compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
