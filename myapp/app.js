var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//跨域问题解决方面


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');  // 导入 catalog 路由

var app = express();
// 设置 Mongoose 连接
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/loacl_library';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//跨域
var allowCrossDomain = function (req, res, next) {

      // 请求源 ajax http://localhost:8080
  
      res.header("Access-Control-Allow-Origin", "*");
  
      // 请求头  x-token
  
      res.header("Access-Control-Allow-Headers", "*");
  
      // 请求方法  post get put delete patch
  
      res.header("Access-Control-Allow-Methods", "*");
  
      // 下一步
  
      next();
  
  }
  
  app.use(allowCrossDomain);
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'pubilc')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // 将 catalog 路由添加进中间件链


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//跨域问题解决方面
app.all('*', function(req, res, next) {
  　　　res.header("Access-Control-Allow-Origin", "*");
             res.header("Access-Control-Allow-Headers", "X-Requested-With");
             res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
             res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
             res.header("X-Powered-By",' 3.2.1')
             res.header("Content-Type", "application/json;charset=utf-8");
             next();
             });

module.exports = app;
