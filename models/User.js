const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//创建Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("users", UserSchema)