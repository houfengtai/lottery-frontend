const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|scss|css|json|txt|html|ico|svg)(\?.*)?$/i
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// const webpack = require('webpack')

module.exports = {
  publicPath: '/',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://lottery.suwen8.com/api/',
        /*target: 'http://localhost:8106/api/',*/
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 代理转发配置，用于调试环境
    disableHostCheck: true
  },
  configureWebpack: (config) => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/', '/lottery'],
          postProcess (renderedRoute) {
            renderedRoute.route = renderedRoute.originalRoute
            renderedRoute.html = renderedRoute.html
              .split(/>[\s]+</gim)
              .join('><')
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(
                __dirname,
                'dist',
                renderedRoute.route
              )
            }
            return renderedRoute
          },
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          },
          renderer: new Renderer({
            // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
            inject: {},
            // headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    /* plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ) */
    config.plugins = [...config.plugins, ...plugins]
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
