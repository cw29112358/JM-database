var koaJWT = require('koa-jwt')
const config = require('config')
const jwtPrivateKey = config.get('Customer.jwtPrivateKey')

module.exports = function (app) {
  app.use(
    koaJWT({ secret: jwtPrivateKey }).unless({
      path: [/^\/api\/auth\/login$/],
    }),
  )
}
