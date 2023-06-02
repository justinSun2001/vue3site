const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    news_content: {type: String},
    news_date: {type: Date},
  }
)

NewsSchema.virtual('url').get(function() {
  return '/nba/news/' + this._id;
});

module.exports = mongoose.model('News', NewsSchema);