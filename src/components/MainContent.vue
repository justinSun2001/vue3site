<template>
  <div class="main">
    <main-content-item :index="index"></main-content-item>
     <main-content-item :index="index-1" v-if='exist1'></main-content-item>
     <main-content-item :index="index-2" v-if='exist2'></main-content-item>
    <div class="pageIndex">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="1"
        :pager-count=5
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MainContentItem from './MainContentItem.vue'

export default {
  name: "MainContent",
  components: {
    MainContentItem,

  },
  props:{
    currentPage:{
      type:Number,
      default:1,
    }
  },
  data(){
    return{
    index:1,
    total:8,
    exist1:true,
    exist2:true
    }
  },
  created () {
        this.axios.get("/catalog/data").then((result)=>{
        this.total=result.data.article_count/3;
        this.index=result.data.article_count-(this.currentPage*3-2);
        if(this.index-1<0)
          this.exist1=false;
          else this.exist1=true;
        if(this.index-2<0)
          this.exist2=false;
          else this.exist2=true;
       })
  },
  methods: {
     handleCurrentChange: function(currentPage){
        this.$store.commit('setCurrentPage',currentPage);
        this.$router.push({
          path:'/home/'+currentPage,
        });
        this.axios.get("/catalog/data").then((result)=>{
        this.index=result.data.article_count-(this.currentPage*3-2);
        if(this.index-1<0)
          this.exist1=false;
          else this.exist1=true;
        if(this.index-2<0)
          this.exist2=false;
          else this.exist2=true;
       })
    },
  }
}
</script>



<style scoped>
  .pageIndex {
    text-align: center;
  }
</style>