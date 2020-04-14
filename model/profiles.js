const mongoose = require('mongoose')
const Schema = mongoose.Schema
const options = require('./schemaOptions')

const profilesSchema = new Schema(
  {
    avatar: Schema.Types.Mixed,
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
    age: Number,
    gender: String,
  },
  options,
)

const profiles = mongoose.model('profile', profilesSchema)

module.exports = profiles
