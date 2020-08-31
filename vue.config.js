module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/target': {
        target: 'http://m.maoyan.com',
        changeOrigin: true,
        pathRewrite:{
          "^/target":""
        }

        /* /target/ajax/comingList  ====> /ajax/comingList  */
      },
      '/ajax': {
        target: 'http://m1.a.com',
        changeOrigin: true
      }
    }

  },
  lintOnSave: false // 关了eslint 检查
}
