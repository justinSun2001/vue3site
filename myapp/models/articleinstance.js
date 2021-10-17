const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleInstanceSchema = new Schema({
    // 指向相关藏书的引用
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    // 出版项
    imprint: {type: String, required: true},
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
      default: 'Maintenance'
    },
    due_back: {type: Date, default: Date.now}
  }
);

// 虚拟属性'url'：藏书副本 URL
ArticleInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/articleinstance/' + this._id;
  });

// 导出 Instancec 模型
module.exports = mongoose.model('ArticleInstance', ArticleInstanceSchema);