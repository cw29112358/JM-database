const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const config = require('config')
const dbConfig = config.get('Customer.dbConfig')
const static = require('koa-static')
const Router = require('koa-router')

const verifyToken = require('./utils/verifyToken')

const talentRouter = require('./routes/talent')
const jobRouter = require('./routes/job')
const userRouter = require('./routes/user')
const profilesRouter = require('./routes/profiles')

const mongoose = require('mongoose')
const url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`
mongoose.connect(url, dbConfig.options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error.'))
db.once('open', () => console.log(`MongoDB is connected at ${url}`))

const app = new Koa()

const router = new Router({
  prefix: '/api',
})

app.use(static(path.join(__dirname, 'public')))

app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    throw err
  }
})

// app.use(koaJWT({ secret: jwtPrivateKey }).unless({
//   // 登录接口不需要验证
//   path: [/^\/api\/auth\/local/]
// }));

router.use('/auth', userRouter)
router.use('/talent', verifyToken, talentRouter)
router.use('/job', verifyToken, jobRouter)
router.use('/profiles', verifyToken, profilesRouter)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
