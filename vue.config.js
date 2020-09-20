module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.11.22.33',
        changeOrigin: true
      }
    }
  }
}
