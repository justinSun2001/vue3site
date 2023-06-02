let Player = require('../models/player');
let Team = require('../models/team')
let News = require('../models/news')
let async = require('async');
const { handle } = require('express/lib/application');

//后台网站主页
exports.index = function (req, res, next) {
  async.parallel({
    player: function(callback) {
      Player.countDocuments({},callback);
  },
    team: function(callback) {
      Team.countDocuments({},callback);
  },
    news: function(callback) {
      News.countDocuments({},callback);
},
}, function(err, results) {
  res.render('index', {player: results.player, team: results.team, news: results.news})
});
};

//搜索球队
exports.searchTeam = function(req, res, next) {
  Team.findOne({name:req.body.teamName})
  .exec(function(err, results){
    if(err) {return next(err)};
    if (results==null) { // No results.
      var err = new Error('Team not found');
      err.status = 404;
      return next(err);
    }
    res.redirect('/nba/team/'+results._id);
  })
}

//搜索球员
exports.searchPlayer = function(req, res, next) {
  Player.findOne({family_name:req.body.playerName})
  .exec(function(err, results){
    if(err) {return next(err)};
    if (results==null) { // No results.
      var err = new Error('Player not found');
      err.status = 404;
      return next(err);
    }
    res.redirect('/nba/player/'+results._id);
  })
}



//创建球员
exports.create_player_get = function(req, res, next) {
  Team.find()
  .exec(function(err, results){
    res.render('player_form', {title:'创建球员', teams:results});
  })
}
exports.create_player_post = function(req, res, next) {
  let player1 = new Player({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    cname:req.body.cname,
    date_of_birth: req.body.date_of_birth,
    height:req.body.height,
    weight:req.body.weight,
    age:req.body.age,
    number:req.body.number,
    pick:req.body.pick,
    intro:req.body.intro,
    honor:req.body.honor,
    team:req.body.team
  });
  player1.save(function (err){
    if(err) {return next(err);}
    res.redirect('/nba')
  })
}

//获取所有球员列表
exports.player_list_get = function(req, res, next) {
  Player.find()
  .exec(function (err, list_players) {
    if (err) { return next(err); }
    // Successful, so render.
    res.render('player_list', { title: '球员列表', player_list: list_players });
})
}

//获取所有球员数据
exports.playerdata = function(req, res, next) {
  Player.find().exec(function (err, playerdata_list) {
    if(err) {return next(err);}
    res.json(playerdata_list);
  })
}


//新建一场比赛记录
exports.create_game_get = function (req, res, next) {
  Player.findById(req.params.id)
  .exec(function(err, results) {
    if(err) {return next(err);}

    res.render('game_form', {title:'创建比赛数据', player:results});
  })
}
exports.create_game_post = function(req, res, next) {
  Player.findById(req.params.id,function(err, player){
    if (err) return next(err);
    const game = {
      game_number:req.body.game_number,
      team_number:req.body.team_number,
      game_time_min: req.body.game_time_min,
      point: req.body.point,
      rebound: req.body.rebound,
      assist: req.body.assist,
      steal: req.body.steal,
      block: req.body.block,
      turnover: req.body.turnover,
      foul: req.body.foul,
      three_made: req.body.three_made,
      three_got: req.body.three_got,
      shot_made: req.body.shot_made,
      shot_got: req.body.shot_got,
      freethrow_made: req.body.freethrow_made,
      freethrow_got: req.body.freethrow_got,
      game_time: req.body.game_time,
    };
    player.game.push(game);
    player.save(function (err) {
      if (err) return next(err)
      res.redirect('/nba/player/'+req.params.id);
    });
  })
}


//更新一场比赛记录
exports.game_update_get = function (req, res, next) {
  Player.findById(req.params.id)
  .exec(function(err, results) {
    if(err) {return next(err);}
    res.render('game_form', {title:'更新比赛数据', player:results, game:results.game.id(req.params.game)});
  })
}
exports.game_update_post = function(req, res, next) {
  Player.findById(req.params.id,function(err, player){
    if (err) return next(err);
    player.game.pull(req.params.game);
    const game = {
      game_number:req.body.game_number,
      team_number:req.body.team_number,
      game_time_min: req.body.game_time_min,
      point: req.body.point,
      rebound: req.body.rebound,
      assist: req.body.assist,
      steal: req.body.steal,
      block: req.body.block,
      turnover: req.body.turnover,
      foul: req.body.foul,
      three_made: req.body.three_made,
      three_got: req.body.three_got,
      shot_made: req.body.shot_made,
      shot_got: req.body.shot_got,
      freethrow_made: req.body.freethrow_made,
      freethrow_got: req.body.freethrow_got,
      game_time: req.body.game_time,
    };
    player.game.push(game);
    player.save(function (err) {
      if (err) return next(err)
      res.redirect('/nba/player/'+req.params.id);
    });
  })
}

//删除一条比赛记录
exports.game_delete_get=function(req, res, next){
  Player.findById(req.params.id)
  .exec(function(err,results){
    if(err) return next(err);
    res.render('game_delete', {player:results, game:results.game.id(req.params.game)});
  })
}
exports.game_delete_post=function(req, res, next){
  Player.findById(req.params.id,function(err, player){
    if(err) return next(err);
    player.game.pull(req.params.game);
    player.save(function(err){
    if(err) return next(err);
    res.redirect('/nba/player/'+req.params.id);
  });
  });
}

//球员详情页
exports.player_page = function (req, res, next) {
  Player.findById(req.params.id).populate('team')
  .exec(function(err, results){
    if(err) return next(err);
    res.render('player_page', {title:'球员主页', player:results});
  })
}

//更新球员基本数据
exports.player_update_get = function(req, res, next) {
  async.parallel({
    player: function(callback) {
        Player.findById(req.params.id).populate('team').exec(callback);
    },
    teams: function(callback) {
        Team.find(callback);
    },
  }, (function(err, results) {
    if(err) return next(err);
    res.render('player_form', {title:'更新球员数据', player:results.player, teams:results.teams});
  })
  )
}
exports.player_update_post = function(req, res, next) {
  const update={
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    cname: req.body.cname,
    date_of_birth: req.body.date_of_birth,
    height:req.body.height,
    weight:req.body.weight,
    age:req.body.age,
    number:req.body.number,
    pick:req.body.pick,
    intro:req.body.intro,
    honor:req.body.honor,
    team:req.body.team,
  };
  Player.findByIdAndUpdate(req.params.id, update)
  .exec(function(err){
    if(err) return next(err);
    res.redirect('/nba/player/'+req.params.id)
  })
}

//删除球员
exports.player_delete_get = function(req, res, next) {
  Player.findById(req.params.id)
  .exec(function(err, results){
    if(err) return next(err);
    res.render('player_delete', {title:'确定删除球员？', player:results});
  })
}
exports.player_delete_post = function(req, res, next) {
  Player.findByIdAndRemove(req.body.id)
  .exec(function(err){
    if(err) return next(err);
    res.redirect('/');
  })
}