let Player = require('../models/player');

//爬虫模块
const fs=require('fs');
const url=require('url');
const gbk=require('gbk');//解决乱码问题 npm i gbk
const JSDOM=require('jsdom').JSDOM;//通过虚拟dom来获取指定class的数据 npm i jsdom
const Segment=require('segment');//中文分词模块 npm i segment

//爬虫函数
function  GetUrl(sUrl,success){
  var urlObj=url.parse(sUrl);
  var http='';
  if(urlObj.protocol=='http:'){
    http=require('http');
  }
  else{
    http=require('https');
  }
  let req=http.request({
    'hostname':urlObj.hostname,
    'path':urlObj.path
  },res=>{                   
    if(res.statusCode==200){
      var arr = [];
      res.on('data', buffer => {
        arr.push(buffer);
      });
      res.on('end', () => {
        let b = Buffer.concat(arr);
        success && success(b);
      })
    }
    else if(res.statusCode==301||res.statusCode==302){
      GetUrl(res.headers.location,success);
    }
  })
  req.end();
  req.on('error',()=>{
    console.log('404');
  })
}

//抓取虎扑数据
exports.hupu_data_get=function(req,res,next){
  res.render('hupu_form',{title:'抓取一场比赛'});
}
//上传虎扑数据
exports.hupu_data_post=function(req,res,next){
  let a=req.body.str.replace('https://nba.hupu.com/games/boxscore/','');
  res.redirect('/nba/hupu/'+a);
}
//展示抓取数据
exports.hupu_data_show=function(req,res,next){
  let url='https://nba.hupu.com/games/boxscore/'+req.params.id;
  GetUrl(url,(data)=>{
    let DOM=new JSDOM(data);
    let document=DOM.window.document;
    let date=document.querySelector('.time_f').innerHTML;
    let a=document.getElementsByTagName("td");
    let aa=[];//球员数据
    let k=0;
    let b=document.getElementsByTagName("h2");
    let bb=[];//比赛数据

    for(let p=0;p<a.length;p++){
      if(a[p].textContent!=''){
        aa[k]=a[p].textContent.replace(/[\r\n]/g,'');
        k++;
      }
    };
    for(let i=0;i<b.length;i++){
      bb[i]=b[i].innerHTML;
    };

    res.render('game_crawl_form',{title:'创建比赛数据', playerData:aa, gameData:bb, gameDate:date});
});
}
//提交球员数据
exports.hupu_data_commit=function(req,res,next){
  Player.findOne({cname:req.body.cname},function(err,player){
    if(err) return next(err);
    let shot=req.body.shot_percent.split('-');
    let three=req.body.three_percent.split('-');
    let freethrow=req.body.freethrow_percent.split('-');
    const game={
      position:req.body.position,
      game_time_min: req.body.game_time_min,
      point: req.body.point,
      rebound: req.body.rebound,
      assist: req.body.assist,
      steal: req.body.steal,
      block: req.body.block,
      turnover: req.body.turnover,
      foul: req.body.foul,
      three_percent: req.body.three_percent,
      shot_percent: req.body.shot_percent,
      freethrow_percent: req.body.freethrow_percent,
      three_made: three[1],
      three_got: three[0],
      shot_made: shot[1],
      shot_got: shot[0],
      freethrow_made: freethrow[1],
      freethrow_got: freethrow[0],
      zhengfuzhi: req.body.zhengfuzhi,
      game_time: req.body.game_time,
    };
    player.game.push(game);
    player.save(function(err){
      if(err) return next(err);
      console.log(req.body.cname);
      res.redirect('/nba/hupu/'+req.params.id);
    });
  });
}

//抓取wallhaven数据
exports.wallhaven_data_get=function(req,res,next){
  res.render('wallhaven_form',{title:'抓取一页图片'});
}
//上传wallhaven数据
exports.wallhaven_data_post=function(req,res,next){
  let url=req.body.str;
  GetUrl(url,(data)=>{
    let DOM = new JSDOM(data);
    let document = DOM.window.document;
    let amount = document.getElementsByTagName('h1')[0].textContent.split(' ')[0];//获取图片总数，24为一个page
    console.log(amount);
    let amount1=document.querySelectorAll(".preview").length;
    console.log(amount1);
    console.log(url);
    let a=[];//图片页面地址
    for (let j = 0; j < amount1; j++) {
      a[j]=document.querySelectorAll(".preview")[j].href;
    }

    res.render('wallhaven_crawl_form',{title:'创建图片数据', urlData:a, urlAmount:amount1, page:req.body.str.slice(-1)});
});
}
//展示抓取数据
 exports.wallhaven_data_show=function(req,res,next){
    res.send('请重新操作')
} 
//上传数据
exports.wallhaven_data_commit=function(req,res,next){
  GetUrl(req.body.url,(data)=>{
    let DOM = new JSDOM(data);
    let document = DOM.window.document;
    let b = document.getElementById("wallpaper").src.replace('/cdn-cgi/mirage/6078ef64a41fd4e7abb3b8c7e5f798f9b57a762129ef73685e52f0c9efac7c6f/1440/', '');
    console.log(b);
    GetUrl(b, data3 => {
      fs.writeFileSync('/Users/sunniujia/Library/CloudStorage/OneDrive-个人/所有图片/wallhaven/boruto/' + req.body.name + '.jpg', data3, function (err, result) {
        if (err) console.log('error', err);
        console.log(req.body.name.slice(-1));
      });
    });
  })
  res.send('成功了:'+req.body.name);
}