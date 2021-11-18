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
    <div class="img"><img :src="img1"></div>
    <div class="text" v-html="text">
    </div>
    <div class="img"><img :src="img2"></div>
    <div class="footer">
      <!-- <audio width="320" height="240" controls>
        <source src="../assets/RAPSTAR-Polo-G.mp3" type="audio/mpeg">
        <embed src="../assets/RAPSTAR-Polo-G.mp3" width="320" height="240">  
      </audio></div>
      <video width="320" height="240" controls>
        <source src="../assets/第一部篮球影片.mp4" type="video/mp4">
        <object data="../assets/第一部篮球影片.mp4" width="320" height="240">
        </object>
      </video>
      -->
    </div>
    <div class="side"><side-content :amount="amount"></side-content></div>
  </div>
  </div>
</template>

<script>
import SideContent from './SideContent.vue'
export default {
  components: { SideContent},
name:'ArticleContent',
data () {
  return {
    title:'',
    message:'',
    date:'',
    text:'',
    amount:1,
    img1:'',
    img2:''
  }
},
mounted () {
    this.getAll();
  },
  methods: {
    getAll() {
      this.axios.get("http://39.107.99.66:3000/catalog/data").then(result=>{
        this.amount=result.data.article_count-1;
      });
      this.axios.get("http://39.107.99.66:3000/catalog/articlesData").then(result=>{
        let index=this.$store.state.pageIndex;
        let id=result.data[index]._id;
        this.axios.get("http://39.107.99.66:3000/catalog/articlesData/"+id+"").then(result=>{
          this.title=result.data.article.title;
          this.message=result.data.article.summary;
          this.text=result.data.article.text;
          this.date=result.data.article.date;
          this.img1=require('../assets/img/'+'item'+(index+1)+'-1'+'.png');
          this.img2=require('../assets/img/'+'item'+(index+1)+'-2'+'.png');
        console.log(result);
      })
      })
    },
  },
computed: {
    pageIndex(){
      return this.$store.state.pageIndex
    }
  }
}
</script>

<style scoped>
  .page {
    position: relative;
  }
  .main {
    width:60%;
    position: absolute;
    top:0;
    left:3%;
  }
  @media screen and (min-width: 1280px){
  .side {
    position: fixed;
    top:10%;
    right:0;
    background-color: lightgoldenrodyellow;
  }
  }
  @media screen and(max-width: 1280px){
    .side {
      display:none;
    }
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
  }
  .text {
    line-height: 25px;
    padding-top: 50px;
    color:rgb(58, 142, 214);
    white-space: pre-wrap;
    text-align: left;
  }
  .footer {
    height:100px;
  }
  .img {
     display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 30px;
  }
  img {
    width:70%;
    height:auto;
  }
</style>