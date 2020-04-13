const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = require('./schemaOptions');

const profilesSchema = new Schema({
  avatar: Schema.Types.Mixed,
  userName: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  age: Number,
  gender: String,
}, options);

const profiles = mongoose.model('profile', profilesSchema);

module.exports = profiles;