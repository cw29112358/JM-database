const profiles = require('../model/profiles')
const signToken = require('../utils/signToken')
const response = require('../utils/response')

exports.getUserInfo = async (ctx) => {
  const { _id } = ctx.state.user
  if (_id) {
    try {
      const findAuth = await profiles.findById(_id, { password: 0 })
      return (ctx.body = response({ auth: findAuth }))
    } catch (err) {
      return (ctx.body = response({ message: '您的登录已经过期' }, 400))
    }
  }
  return (ctx.body = response({ message: '您的登录已经过期' }, 400))
}

exports.login = async (ctx) => {
  const { userName, password } = ctx.request.body
  const findProfile = await profiles.findOne({ userName })
  if (findProfile) {
    if (findProfile.password === password) {
      const token = signToken(findProfile._id)
      return (ctx.body = response({ token }))
    } else {
      return (ctx.body = response({ message: '您输入的密码不正确' }, 400))
    }
  }
  return (ctx.body = response({ message: '该用户尚未注册，请先注册' }, 400))
}
