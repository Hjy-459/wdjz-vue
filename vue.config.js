const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false,
//   devServer: { disableHostCheck: true }
// })
// vue3 vue.config.js
module.exports = {
  // 跳过检查host
  devServer: { disableHostCheck: true }
}
