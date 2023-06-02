var  User = require('../models/user');
var async = require('async');

exports.user_register = function(req, res, next) {
  let user = new User(
    {
      password: req.body.pass,
      email: req.body.email,
      userName: req.body.userName,
    }
  );
  // Save user.
  user.save(function (err) {
    if (err) { return next(err); }
    else{res.json(req.body)};
  });
};

exports.user_login = function(req,res,next) {
  User.findOne({email:req.body.email}).
  where('password').equals(req.body.pass).
  exec(function(err,login){
    if(err) {return next(err); }
    else{
      res.json(login);
    }
  });
};


exports.user_list = function(req, res, next) {
User.find().exec(function(err,user_list){
  if(err) {return next(err);}
  else {
    res.json(user_list);
  }
});
};


