// const http=require('http');//不需要了，通过geturl判断http和https协议。
var index = 0;
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');//解决乱码问题 npm i gbk
const JSDOM = require('jsdom').JSDOM;//通过虚拟dom来获取指定class的数据 npm i jsdom
const Segment = require('segment');//中文分词模块 npm i segment
const path = require('path');

//判断网络协议同时自动解析域名和路径
function GetUrl(sUrl, success) {
  index++;
  var urlObj = url.parse(sUrl);
  var http = '';
  if (urlObj.protocol == 'http:') {
    http = require('http');
  }
  else {
    http = require('https');
  }

  let req = http.request({
    'hostname': urlObj.hostname,
    'path': urlObj.path
  }, res => {           
    console.log(res.statusCode);         //判定状态码
    if (res.statusCode == 200) {
      var arr = [];
      res.on('data', buffer => {
        arr.push(buffer);
        console.log(arr);
      });
      res.on('end', () => {
        let b = Buffer.concat(arr);
        console.log(b);
        success && success(b);
      })
    }
    else if (res.statusCode == 301 || res.statusCode == 302) {
      console.log('我是第${index}次重定向', res.headers.location);
      GetUrl(res.headers.location, success);//通过递归来解决页面重定向问题
    }
  })
  req.end();
  req.on('error', () => {
    console.log('404');
  })
}

let baseUrl = 'https://www.behance.net/search/projects?search=stephen+curry&tracking_source=typeahead_search_suggestion';
GetUrl(baseUrl, data => {
  let DOM = new JSDOM(data);
  let document = DOM.window.document;
  let b=document.querySelectorAll('.Cover-showOnHover-oZ2')[0].getElementsByTagName('a')[0].href;
  console.log(b);
});

/* GetUrl(a[0],data=>{
  let DOM = new JSDOM(data);
  let document = DOM.window.document;
  let b = document.getElementById("wallpaper").src.replace('/cdn-cgi/mirage/6078ef64a41fd4e7abb3b8c7e5f798f9b57a762129ef73685e52f0c9efac7c6f/1440/', '');
  console.log(b);
}) */
/* let a=document.querySelectorAll(".preview")[0].href;
console.log(a);
GetUrl(a,data1=>{
  let DOM1=new JSDOM(data1);
  let document1=DOM1.window.document;
  let b=document1.getElementById("wallpaper").src.replace('/cdn-cgi/mirage/6078ef64a41fd4e7abb3b8c7e5f798f9b57a762129ef73685e52f0c9efac7c6f/1440/','');
  console.log(b);
  fs.mkdirSync('./public/images/curry')//创建文件夹
  GetUrl(b,data2=>{
    fs.writeFile('./public/images/curry/1.jpg',data2,function(err,result){
      if(err) console.log('error',err);
    });
  }); 
}); */
/*   //中文分词统计
  let seg=new Segment();
  seg.useDefault();
  var str='斯蒂芬库里超远三分';
  var arr1=seg.doSegment(str);
  var myarr=[];
  //去除指定类型的文字
  arr1.Foreach(data=>{
    if(data.p!=2048&&data.p!=123123){
      myarr.push(data.w);
    }
  });
  //统计出现次数
  var myJson={};
  myarr.forEach(data=>{
    if(!myJson[data]){
      myJson[data]=1;
    }
    else{
      myJson[data]++;
    }
  });
  //去掉只出现一次的
  let arr2=[];
  for(let word in myJson){
    if(myJson[word]<=1){
      continue;
    }
    arr2.push({
      w:word,
      c:myJson[word]
    })
  };
  arr2.sort((json1,json2)=>json2.c-json1.c);//排序从多到少 */

/*  //获取指定的数据
 let DOM=new JSDOM(data);
 let document=DOM.window.document;
 let date=document.querySelector('.time_f').innerHTML;
 console.log(date);
 let a=document.getElementsByTagName("td");
 let b=[];
 let j=0;
 for(let i=0;i<a.length;i++){
   if(a[i].textContent!=''){
     b[j]=a[i].textContent.replace(/[\r\n]/g,'');
     console.log(b[j]);
     j++;
   }
 };
 for(let i=0;i<a.length;i++){
   if(a[i].textContent=='贾-莫兰特'){
     console.log(a[i+1].textContent);
     console.log(a[i+2].textContent);
   }
   if(a[i].textContent=='格兰特-威廉姆斯'){
     console.log(a[i+1].textContent);
     console.log(a[i+2].textContent);
   }
 }
 console.log(a[98].textContent);//innerText和textContent的兼容性区别
 console.log(document.querySelector('.text').innerHTML.replace(//正则表达式)); */

/* //页面有乱码时
var html= gbk.toString('utf-8',data);
fs.writeFile('nba.html',html,function(err,result){
  if(err) console.log('error',err);
}); */

//页面无乱码时
// fs.writeFile('nba1.html',data,function(err,result){
//   if(err) console.log('error',err);
// });

// fs.writeFile('122.jpg',data,function(err,result){
//   if(err) console.log('error',err);
// });

//console.log(data);



/* let req=http.request({
  'hostname':'w.wallhaven.cc',
  'path':'/full/l8/wallhaven-l83o92.jpg',
},res=>{
  var arr=[];
  var str='';
  res.on('data',buffer=>{
    arr.push(buffer);
    str+=buffer;
  });

  res.on('end',()=>{

    //转化成二进制对象,就能打开了，同时注意可能是https和http的区别
    let b=Buffer.concat(arr);
    fs.writeFile('awd.jpg',b,function(err,result){
      if(err) console.log('error',err);
    });

    //无法打开照片
    fs.writeFile('awdwad.jpg',str,function(err,result){
      if(err) console.log('error',err);
    });

    //写成html文件
    fs.writeFile('download.html',str,function(err,result){
      if(err) console.log('error',err);
    });

    // console.log(arr,str); //检验二进制类型和字符串类型区别
  })
});

req.end(); */
