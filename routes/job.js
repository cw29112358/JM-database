const Router = require('koa-router')
const router = new Router()

const jobController = require('../controllers/jobController')

router.get('/jobs', jobController.jobs)

router.post('/create', jobController.create)

router.get('/jobDetail', jobController.jobDetail)

router.delete('/deleteJob', jobController.deleteJob)

module.exports = router.routes()
