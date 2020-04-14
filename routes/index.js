const Router = require('koa-router')

const jobRouter = require('./job')
const userRouter = require('./user')
const profilesRouter = require('./profiles')

const router = new Router({
  prefix: '/api',
})

router.use('/auth', userRouter)
router.use('/job', jobRouter)
router.use('/profiles', profilesRouter)

module.exports = router
