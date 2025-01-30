const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  text: {type:String, required: true},
  date: {type: String, required: true},
  path:{type:String},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// 虚拟属性'url'：藏书 URL
ArticleSchema
  .virtual('url')
  .get(function () {
    return '/catalog/article/' + this._id;
  });

// 导出  模块
module.exports = mongoose.model('Article', ArticleSchema);