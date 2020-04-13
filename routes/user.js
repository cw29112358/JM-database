const Router = require('koa-router')
const router = new Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.getUserInfo)
router.post('/login', usersController.login)

module.exports = router.routes()
