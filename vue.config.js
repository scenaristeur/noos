const { defineConfig } = require('@vue/cli-service')
const publicPath = process.env.NODE_ENV === 'production' ? '/noos/' : '/'


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath,
  //   pwa: {
  //   name: 'Booklice',
  //   //  themeColor: '#4DBA87',
  //   //  msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',
  //   manifestOptions: {
  //     share_target: {
  //       action: publicPath,
  //       method: "GET",
  //       enctype: "application/x-www-form-urlencoded",
  //       params: {
  //         title: "title",
  //         text: "text",
  //         url: "url"
  //       }
  //     },
  //   }
  // },

  // browser-vue https://github.com/ipfs/js-ipfs/blob/c47a6335b77d5284711f13a83349000820f85775/examples/browser-vue/vue.config.js
  chainWebpack: config => config.resolve.symlinks(false),
})
