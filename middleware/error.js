// const isString = require('lodash/isString')

module.exports = function (app) {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.log('err---', err)
      // let error = err
      // if (isString(error)) {
      //   error = {
      //     code: 500,
      //     status: 'Failure',
      //     reason: err,
      //   }
      // }
      // if (error.code < 100) {
      //   error.code = 500
      // }
      // ctx.status = typeof error.code === 'number' ? error.code : 500
      // ctx.body = error
      // ctx.app.emit('error', error)
      // app.on('error', (err) => {
      //   console.error(err)
      // })
      // process.on('uncaughtException', (err) => {
      //   console.error(err)
      //   console.log('NOT exit...')
      // })

      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        }
      } else {
        err.status = err.statusCode || err.status || 500
        throw err
      }
    }
  })
}
