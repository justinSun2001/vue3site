let Team = require('../models/team');
let Player = require('../models/player');
let async = require('async');

//创建球队
exports.create_team_get = function(req, res, next) {
  res.render('team_form', {title:'创建一支球队'});
}

exports.create_team_post = function(req, res, next) {
  let team = new Team({
    name: req.body.name,
    cname: req.body.cname,
  });
  team.save(function(err){
    if(err) return next(err);
    res.redirect('/nba/teamList');
  })
}

//所有球队列表
exports.team_list_get = function (req, res, next) {
  Team.find()
  .exec(function (err, results) {
    if(err) return next(err);
    res.render('team_list', {title:'所有球队', team_list:results});
  })
}

//球队详情
exports.team_detail = function (req, res, next) {
  async.parallel({
    team: function(callback) {
      Team.findById(req.params.id).exec(callback)
    },
    team_players: function(callback) {
      Player.find({'team': req.params.id}).exec(callback)
    },
  }, function(err, results){
    if(err) return next(err);
    res.render('team_detail', {title:'球队详情', team:results.team, players:results.team_players})
  })
}