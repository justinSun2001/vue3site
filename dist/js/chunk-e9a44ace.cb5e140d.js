(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e9a44ace"],{"07f1":function(t,e,a){},"0c8a":function(t,e,a){"use strict";var c=a("7a23");const i=Object(c["fb"])("data-v-1ee7e6dd");Object(c["G"])("data-v-1ee7e6dd");const s={class:"head"},n=Object(c["l"])("Home"),l=Object(c["l"])("Articles"),r=Object(c["l"])("SC"),o={class:"main"},d={class:"content"};Object(c["E"])();const h=i((t,e,a,h,b,u)=>{const m=Object(c["M"])("el-breadcrumb-item"),g=Object(c["M"])("el-breadcrumb");return Object(c["D"])(),Object(c["i"])("div",s,[Object(c["m"])(g,{"separator-class":"el-icon-arrow-right"},{default:i(()=>[Object(c["m"])(m,{to:{path:"/home"}},{default:i(()=>[n]),_:1}),Object(c["m"])(m,{to:{path:"/articles"}},{default:i(()=>[l]),_:1}),Object(c["m"])(m,null,{default:i(()=>[r]),_:1})]),_:1}),Object(c["m"])("div",o,Object(c["Q"])(b.title),1),Object(c["m"])("div",d,Object(c["Q"])(b.text),1)])});var b={data(){return{title:"Lifestyle",text:""}},mounted(){this.getAll()},methods:{getAll(){this.axios.get("http://39.107.99.66:3000/catalog/articlesData").then(t=>{let e=t.data[0]._id;this.axios.get("http://39.107.99.66:3000/catalog/articlesData/"+e).then(t=>{this.title=t.data.article.title,this.text=t.data.article.summary})})}}};a("6466");b.render=h,b.__scopeId="data-v-1ee7e6dd";e["a"]=b},6466:function(t,e,a){"use strict";a("e132")},"9ae4":function(t,e,a){"use strict";a.r(e);var c=a("7a23");function i(t,e,a,i,s,n){const l=Object(c["M"])("head-content"),r=Object(c["M"])("articles-content");return Object(c["D"])(),Object(c["i"])(c["b"],null,[Object(c["m"])(l),Object(c["m"])(r)],64)}var s=a("0c8a");const n=Object(c["fb"])("data-v-17a65b93");Object(c["G"])("data-v-17a65b93");const l={class:"main"},r={class:"article-content"},o={class:"item-text"},d={class:"pageIndex"};Object(c["E"])();const h=n((t,e,a,i,s,n)=>{const h=Object(c["M"])("el-pagination");return Object(c["D"])(),Object(c["i"])("div",l,[Object(c["m"])("div",r,[Object(c["m"])("div",o,[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(s.finals.slice(s.point,s.total-7*(s.currentPage-1)).reverse(),(t,e)=>(Object(c["D"])(),Object(c["i"])("div",{class:"text-right",key:e},[Object(c["m"])("span",{onClick:t=>n.itemClick(e),class:{active:s.isActive}},Object(c["Q"])(t),11,["onClick"])]))),128))])]),Object(c["m"])("div",d,[Object(c["m"])(h,{background:"",layout:"prev, pager, next",onCurrentChange:n.handleCurrentChange,"current-page":s.currentPage,"page-size":7,total:s.total},null,8,["onCurrentChange","current-page","total"])])])});var b={name:"ArticlesContent",data(){return{point:1,total:100,currentPage:100,message:[],title:[],items:[],finals:[],isActive:!1}},mounted(){this.getAmount()},updated(){this.getUpdate()},methods:{itemClick(t){let e=this.point+6-t;2==this.currentPage&&(e=this.total%7-1-t),this.$store.commit("getIndex",e),this.$router.push({path:"/articles/article"+e}),this.isActive=!0},getAmount(){this.axios.get("http://39.107.99.66:3000/catalog/data").then(t=>{this.total=t.data.article_count,this.point=t.data.article_count})},handleCurrentChange:function(t){this.axios.get("http://39.107.99.66:3000/catalog/data").then(e=>{this.currentPage=t;let a=e.data.article_count-7*t;this.point=a<0?0:a})},getUpdate(){for(let t=this.total-1;t>=0;t--)this.axios.get("http://39.107.99.66:3000/catalog/articlesData").then(e=>{this.items[t]=e.data[t]._id,this.axios.get("http://39.107.99.66:3000/catalog/articlesData/"+this.items[t]).then(e=>{this.title[t]=e.data.article.title,this.message[t]=e.data.article.summary,this.finals[t]=this.title[t]+":"+this.message[t],console.log(e)})})}}};a("c3f4");b.render=h,b.__scopeId="data-v-17a65b93";var u=b,m={components:{HeadContent:s["a"],ArticlesContent:u}};m.render=i;e["default"]=m},c3f4:function(t,e,a){"use strict";a("07f1")},e132:function(t,e,a){}}]);
//# sourceMappingURL=chunk-e9a44ace.cb5e140d.js.map