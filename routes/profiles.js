const multer = require('@koa/multer'); // 用于处理multipart/form-datakoa 的node.js中间件
const jwt = require('jsonwebtoken');
const jwtPrivateKey = require('config').get('Customer.jwtPrivateKey');
const Router = require('koa-router');
const router = new Router();

// multer配置
const storage = multer.diskStorage({
  destination: 'public/avatar',
  filename: function (req, file, cb) {
    // 获取请求头中的authorization
    const { authorization } = req.headers;
    // 解码authorization
    const decoded = jwt.verify(authorization, jwtPrivateKey);
    const fileformat = file.originalname.split('.');
    // 使用用户id命名上传头像文件
    cb(null, `${decoded._id}.${fileformat[fileformat.length - 1]}`);
  }
})
const upload = multer({ storage });

const profilesController = require('../controllers/profilesController');

// 上传用户头像
router.post('/upload', upload.single('avatar'), profilesController.upload)

module.exports = router.routes();
