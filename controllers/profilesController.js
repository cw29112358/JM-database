const config = require('config')
const dbConfig = config.get('Customer.dbConfig')
const response = require('../utils/response')
const profiles = require('../model/profiles')

exports.upload = async (ctx) => {
  // console.log('ctx.request.file', ctx.request.file);
  // console.log('ctx.file', ctx.file);
  // console.log('ctx.request.body', ctx.request.body);
  // 获取请求头参数_id
  const { _id } = ctx.request
  if (_id) {
    const { filename, mimetype, fieldname } = ctx.file
    // 找到该用户并且修改其头像字段
    profiles.findByIdAndUpdate(
      _id,
      {
        avatar: {
          uri: `${dbConfig.http}://${dbConfig.host}:${dbConfig.defaultPort}/avatar/${filename}`,
          name: fieldname,
          type: mimetype,
        },
      },
      { new: true },
      (err, result) => {
        if (err) {
          return (ctx.body = response('保存失败', 400))
        }
      },
    )
  }
  return (ctx.body = ctx.file)
}
