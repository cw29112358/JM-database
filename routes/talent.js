const Router = require('koa-router')
const router = new Router()

const talentController = require('../controllers/talentController')

router.get('/', talentController.poolList)

router.post('/create', talentController.create)

router.put('/toggleFavorite', talentController.toggleFavorite)

router.post('/contactList', talentController.contactList)

module.exports = router.routes()
