<template>
<div class="main">
    <div class="text-right" v-for="(item,index) in message.slice(start,end).reverse()" :key="index">
      <div class="text-container"><a class="text" @click="itemClick(index)">{{item}}</a></div>
    </div>
</div>
<div class="pageIndex">
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total">
  </el-pagination>
</div>
</template>

<script>

export default{
  name:'ArticlesContent',
  props:{
    currentPage:Number,
  },
  data () {
    return {
      total:0,
      pageSize:15,
      start:0,
      end:0,
      message:[],
      items:[],
    }
  },
  created () {
      this.axios.get("/catalog/data").then((result)=>{
      this.total=result.data.article_count;
      this.start=this.total-(this.currentPage*this.pageSize)>0?this.total-(this.currentPage*this.pageSize)-1:0;
      this.end=this.total-((this.currentPage-1)*this.pageSize);
        for(let i=this.total-1; i>=0; i--){
        this.axios.get("/catalog/articlesData").then((result)=>{
          this.items[i]=result.data[i]._id;
          this.axios.get("/catalog/articlesData/"+this.items[i]).then(result=>{
            this.message[i]=result.data.article.summary;
          console.log(result);
        })
      })
    }
  })

  },
  
  methods: {
    itemClick(n){
      let id=this.items[this.total-n-1-(this.currentPage-1)*this.pageSize];
      this.$router.push({
        path:"/articles/"+id
      });
      },
 
     handleCurrentChange: function(currentPage){
        this.$store.commit('setCurrentPage1',currentPage);
        this.$router.push({
          path:'/articleList/'+currentPage,
        });

        this.axios.get("/catalog/data").then((result)=>{
          this.total=result.data.article_count;
          this.start=this.total-(this.currentPage*this.pageSize)>0?this.total-(this.currentPage*this.pageSize)-1:0;
          this.end=this.total-((this.currentPage-1)*this.pageSize);
            for(let i=this.total-1; i>=0; i--){
            this.axios.get("/catalog/articlesData").then((result)=>{
              this.items[i]=result.data[i]._id;
              this.axios.get("/catalog/articlesData/"+this.items[i]).then(result=>{
                this.message[i]=result.data.article.summary;
              console.log(result);
        })
      })
    }
  })
  },
}
}
</script>


<style scoped>

.text-right :hover {
  background-color: whitesmoke;
}
.text-container {
  background-color: #f9f9fb;
  border-bottom:1px solid rgb(191, 185, 185);
  padding-left: 5px;
  height: 3em;
  line-height: 3em;
  overflow: hidden;
}
a:hover {
  text-decoration: underline;
  color:rgb(10, 26, 26);
}
.text {
  cursor: pointer;
}
.pageIndex {
    text-align: center;
    padding-top: 20px;
  }
</style>