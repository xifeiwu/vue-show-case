'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config')
const webpack = require('webpack');
const customLoader = require('./vue-loader.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// chunksAndTemplates is used to config bundle-js and html
const chunksAndTemplates = (() => {
  let entries = {
    'profile': path.resolve(config.BASE_DIR, `${config.VUE_PROJECT_NAME}/profile/entry.js`),
  };
  let htmlConfigs = [
    {
      "filename": "profile.html",
      "title": "view vue components",
      "cdn": {
        "js": [],
        // "css": [`${config.ASSETS_PREFIX}assets/components/ele/theme-chalk/profile.css`]
      },
      "chunks": ["profile"],
    },
  ];

  let templates = htmlConfigs.map(it => {
    it.chunks = ["manifest"].concat(it.chunks);
    if (!it.hasOwnProperty('template')) {
      it.template = path.join(__dirname, 'config/index.tpl');
    }
    it.inject = true;
    it.chunksSortMode = 'dependency';
    return new HtmlWebpackPlugin(it);
  });

  return {entries, templates}
})();

var baseConfig = {
  context: config.BASE_DIR,
  entry: chunksAndTemplates.entries,
  output: {
    path: config.build.assetsRoot,
    filename: "[name].[hash].js",
    publicPath: config.ASSETS_PREFIX
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', '.sass'],
    alias: {
      '$assets': config.BASE_DIR + '/assets',
      '$components': config.BASE_DIR + '/components',
      'element-ui': config.BASE_DIR + '/components/element-ui',
      'assets': config.BASE_DIR + `/${config.VUE_PROJECT_NAME}/assets`,
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: customLoader.cssLoaderConfig
      },
      {
        test: /\.js$/,
        include: config.BASE_DIR,
        exclude: /node_modules|bower_components/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: chunksAndTemplates.templates.concat([
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(config.BASE_DIR, 'assets/static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(config.BASE_DIR, `${config.VUE_PROJECT_NAME}/assets/static`),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ProvidePlugin({
       'browserDebug': [path.resolve(config.BASE_DIR, 'assets/libs/debug/browser.js')],
    }),
    new webpack.DefinePlugin({
      'BUILD_ENV': {
        PLATFORM: `'${process.env.PLATFORM}'`,
        TIMESTAMP: Date.now()
      }
    })
  ]),
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

module.exports = baseConfig;
