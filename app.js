const Koa = require('koa')
const config = require('config')
const { host, mongodbPort, dbName, options } = config.get('Customer.dbConfig')

const mongoose = require('mongoose')
const url = `mongodb://${host}:${mongodbPort}/${dbName}`
mongoose.connect(url, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error.'))
db.once('open', () => console.log(`connected at ${url}`))

const errorMiddleware = require('./middleware/error')
const staticMiddleware = require('./middleware/static')
const bodyParserMiddleware = require('./middleware/bodyParser')
const jwtMiddleware = require('./middleware/jwt')
const routes = require('./routes')

const app = new Koa()
Koa.prototype.apply = function (module, ...rest) {
  module(this, ...rest)
  return this
}

app
  .apply(staticMiddleware)
  .apply(bodyParserMiddleware)
  .apply(errorMiddleware)
  .apply(jwtMiddleware)
  .use(routes.routes())
  .use(routes.allowedMethods())

module.exports = app
