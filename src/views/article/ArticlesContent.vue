<template>
<div class="main">
  <div class="article-content">
    <div class="item-text">
      <div class="text-right" v-for="(item,index) in finals.slice(point,total-((currentPage-1)*7)).reverse()" :key="index">
          <span @click="itemClick(index)" :class="{active:isActive}">{{item}}</span>
    </div>
  </div>
  </div>
  <div class="pageIndex">
  <el-pagination
  background
  layout="prev, pager, next"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-size="7"
  :total="total">
</el-pagination>
  </div>
</div>
</template>

<script>

export default{
  name:'ArticlesContent',
  data () {
    return {
      point:1,
      total:100,
      currentPage:100,
      message:[],
      title:[],
      items:[],
      finals:[],
      isActive:false,
    }
  },
  mounted () {
    this.getAmount();
  },
  updated() {
    this.getUpdate();
  }, 
  methods: {
    itemClick(n){
      let index=this.point+6-n;
      if(this.currentPage==2)
      index=this.total%7-1-n;
      this.$store.commit('getIndex', index);
      this.$router.push({
        path:"/articles/"+"article"+index+""
      });
      this.isActive=true;
      },
    getAmount(){
        this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.total=result.data.article_count;
        this.point=result.data.article_count;
      })
      
    },
     handleCurrentChange: function(currentPage){
       this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.currentPage = currentPage;
        let p=result.data.article_count-((currentPage)*7);
        if(p<0) this.point=0;
        else this.point=p;
       })
      },
    getUpdate() {
      for(let i=this.total-1; i>=0; i--){
      this.axios.get("http://localhost:3000/catalog/articlesData").then(result=>{
         this.items[i]=result.data[i]._id;
        this.axios.get("http://localhost:3000/catalog/articlesData/"+this.items[i]+"").then(result=>{
          this.title[i]=result.data.article.title;
          this.message[i]=result.data.article.summary;
          this.finals[i]=this.title[i]+":"+this.message[i];
        console.log(result);
      })
      })
      }
    }
  }
}
</script>

<style scoped>
.item-text {
  padding-top:20px;
  padding-bottom: 20px;
}
.text-right {
  height:50px;
  background-color: whitesmoke;
  border:1px solid rgba(227, 230, 235, 0.923);
  line-height: 50px;
  overflow:hidden;
}
.active {
  color:grey;
}
.pageIndex {
    text-align: center;
  }
</style>