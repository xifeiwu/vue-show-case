'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const curWorkDir = process.cwd();

module.exports = {
  curWorkDir: curWorkDir,
  dev: {

    // Paths
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      '/j-api/paas/': {
        target: 'http://10.10.202.143:30334',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: path => path.replace('\/j-api\/paas\/', '\/'),
      },
      '/n-api/assist': {
        target: 'http://10.10.80.242:6002',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: path => path.replace('\/n-api\/assist\/', ''),
      },
      '/n-api/': {
        target: 'http://127.0.0.1:6003',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: path => path.replace('\/n-api', ''),
      },
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 7001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    distDirectory: path.resolve(curWorkDir, 'deploy/show-case/dist'),
    assetsRoot: path.resolve(curWorkDir, 'deploy/show-case/dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.ANALYZE_REPORT
  }
}