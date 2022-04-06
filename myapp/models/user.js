const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {type: String,},
  password: {type: String,},
  email: {type:String},
  userName: {type:String},
});


// 导出  模块
module.exports = mongoose.model('User', UserSchema);