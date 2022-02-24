module.exports = {
  configureWebpack: {
    module: {
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  transpileDependencies: ['vuetify']
}
