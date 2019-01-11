const path = require('path')

const APP_DIR = path.resolve(__dirname, 'src')

module.exports = {
  resolve: {
    alias: {
      js: path.resolve(APP_DIR + '/js'),
      api: path.resolve(APP_DIR + '/js/api'),
      appUtils: path.resolve(APP_DIR + '/js/appUtils'),
      jsx: path.resolve(APP_DIR + '/jsx'),
      img: path.resolve(APP_DIR + '/img'),
      scss: path.resolve(APP_DIR + '/scss'),
      constants: path.resolve(APP_DIR + '/constants'),
      datasets: path.resolve(APP_DIR + '/datasets'),
      common: path.resolve(APP_DIR + '/jsx/common'),
      graphs: path.resolve(APP_DIR + '/jsx/common/graphs'),
      dist: path.resolve(APP_DIR + '/dist'),
      src: path.resolve(APP_DIR + '/src')
    }
  }
}
