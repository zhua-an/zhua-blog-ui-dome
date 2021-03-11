const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resUrl = 'http://localhost:8888'
const port = 8088
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 基础路径 注意发布之前要先修改这里
const baseUrl = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: baseUrl, // 根据你的实际情况更改这里
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      'axios': 'axios',
      // 'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    entry
      .add('@/mock')
      .end()
    // config.resolve.alias
    //   .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    //   .set('_c', resolve('src/components'))
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
        return {
            plugins: [new CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css/,
                threshold: 10240,
                deleteOriginalAssets: false
            })]
        }
    }
  },
  //配置转发代理
  devServer: {
    disableHostCheck: true,
    port: port,
    proxy: {
      '/': {
        target: resUrl,
        ws: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}