module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      axios: "axios"
    });
    const entry = config.entry("app");
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    },
  },
  transpileDependencies: ['v-emoji-picker', 'crypto-js', 'resize-detector', 'avue-plugin-ueditor']
};
