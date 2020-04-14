const static = require('koa-static')
const path = require('path')

module.exports = function (app) {
  app.use(static(path.join(__dirname, 'public')))
}
