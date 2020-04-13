const jwt = require('jsonwebtoken')
const jwtPrivateKey = require('config').get('Customer.jwtPrivateKey')
const response = require('../utils/response')

const verifyToken = async (ctx, next) => {
  const { authorization } = ctx.request.headers
  if (!authorization) {
    return (ctx.body = response('拒绝访问', 400))
  }
  try {
    const decoded = await jwt.verify(authorization, jwtPrivateKey)
    ctx.request._id = decoded['_id']
    await next()
    return
  } catch (e) {
    return (ctx.body = response('无效token', 400))
  }
}

module.exports = verifyToken
