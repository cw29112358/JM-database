const jwt = require('jsonwebtoken')
const jwtPrivateKey = require('config').get('Customer.jwtPrivateKey')

// 注册token
const signToken = (_id) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '1d',
  }
  return jwt.sign({ _id }, jwtPrivateKey, options)
}

module.exports = signToken
