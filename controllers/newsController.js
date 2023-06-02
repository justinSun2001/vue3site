let News = require('../models/news');

//创建新闻
exports.create_news_get = function(req, res, next) {
  res.render('news_form', {title:'增添一则新闻'});
}
exports.create_news_post = function(req, res, next) {
  let news = new News({
    news_content: req.body.news_content,
    news_date: req.body.news_date,
  });
  news.save(function(err){
    if(err) return next(err);
    res.redirect('/nba/newsList');
  })
}

//所有新闻列表
exports.news_list_get = function (req, res, next) {
  News.find()
  .exec(function (err, results) {
    if(err) return next(err);
    res.render('news_list', {title:'NBA新闻', news_list:results});
  })
}