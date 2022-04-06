var  User = require('../models/user');
var async = require('async');

exports.user_email_post = function(req, res, next) {
    if(req.body.__proto__===undefined)Object.setPrototypeOf(req.body, new Object());
    let user = new User(
      {
          // id: req.body.id,
          // password: req.body.password,
          // userName: req.body.userName,
          email: req.body.email,
      }
    );
    // Save user.
    user.save(function (err) {
      if (err) { return next(err); }
  });
};

exports.user_email_get = function(req, res, next) {
  User.find().exec(function(err,user_list){
    if(err) {return next(err);}
    else {
      res.json(user_list);
    }
  });
};