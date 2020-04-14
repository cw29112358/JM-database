const multer = require('@koa/multer')
const jwt = require('jsonwebtoken')
const jwtPrivateKey = require('config').get('Customer.jwtPrivateKey')
const Router = require('koa-router')
const router = new Router()

const storage = multer.diskStorage({
  destination: 'public/avatar',
  filename: function (req, file, cb) {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization.slice(7), jwtPrivateKey)
    const fileformat = file.originalname.split('.')
    cb(null, `${decoded._id}.${fileformat[fileformat.length - 1]}`)
  },
})
const upload = multer({ storage })

const profilesController = require('../controllers/profilesController')

router.post('/upload', upload.single('avatar'), profilesController.upload)

module.exports = router.routes()
