<template>
  <div class="page">
    <div class="main">
      <div class="title">
        <h1>《{{title}}》</h1>
      </div>
      <div class="date">
        --{{date}}
      </div>
      <div class="head">
        {{message}}
      </div>
      <div class="markdown-body" v-html="text">
      </div>
    </div>
    <div class="side"><side-content :amount="amount">
      </side-content>
    </div>
  </div>
</template>

<script>
import SideContent from './SideContent.vue'

import {marked} from 'marked'


export default {
  components: { SideContent},
  name:'ArticleContent',
  data () {
    return {
      title:'',
      message:'',
      date:'',
      content:'',
      amount:1,
      text:'',
    }
  },
  created () {
    this.axios.get("/catalog/data").then(result=>{
          this.amount=result.data.article_count-1;
        });
    this.axios.get("/catalog/articlesData").then(result=>{
      let index=this.$store.state.pageIndex;
      let id=result.data[index]._id;
      this.axios.get("/catalog/articlesData/"+id+"").then(result=>{
        this.title=result.data.article.title;
        this.message=result.data.article.summary;
        this.date=result.data.article.date;
        
        this.text=marked(result.data.article.text);
    })
    });
    // 添加CSS样式（md语法）
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css';
    document.head.appendChild(link);

  },
  }
</script>

<style scoped>
.page {
      margin:0 18px;
    }
/* flex布局以及适配 */
  @media screen and (min-width: 1080px){
  .page {
    display: flex;
    justify-content: space-between;
  }
  .side {
    margin-left: 20px;
  }
  .main {
    display:flex;
    flex-direction: column;
    justify-content: space-around;
  }
  }

  @media screen and(max-width: 1080px){
    .page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  }
  .main {
    margin-bottom: 20px;
  }
  .title {
    text-align: center;
  }
  .date {
    text-align: right;
  }
  .head {
    width:80%;
    color:brown;
    font-size: small;
    margin-bottom: 25px;
  }
 
  @import '../assets/markdown.css';


</style>