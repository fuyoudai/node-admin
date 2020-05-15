const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//创建Schema
const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model("profiles", ProfileSchema)