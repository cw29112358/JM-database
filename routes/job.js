const Router = require('koa-router')
const router = new Router()

const jobController = require('../controllers/jobController')

router.get('/', jobController.jobs)

router.post('/', jobController.create)

router.get('/detail', jobController.jobDetail)

router.delete('/', jobController.deleteJob)

module.exports = router.routes()
