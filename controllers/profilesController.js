const dbConfig = require('config').get('Customer.dbConfig')
const response = require('../utils/response')
const profiles = require('../model/profiles')

exports.upload = async (ctx) => {
  // console.log('ctx.request.file', ctx.request.file);
  // console.log('ctx.file', ctx.file);
  // console.log('ctx.request.body', ctx.request.body);
  // const { _id } = ctx.request
  const _id = ctx.state.user
  if (_id) {
    const { filename, mimetype, fieldname } = ctx.file
    profiles.findByIdAndUpdate(
      _id,
      {
        avatar: {
          uri: `${dbConfig.http}://${dbConfig.host}:${dbConfig.port}/avatar/${filename}`,
          name: fieldname,
          type: mimetype,
        },
      },
      { new: true, useFindAndModify: false },
      (err, result) => {
        if (err) {
          return (ctx.body = response('保存失败', 400))
        }
      },
    )
  }
  return (ctx.body = ctx.file)
}
