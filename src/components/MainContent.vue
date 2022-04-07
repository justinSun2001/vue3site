<template>
<el-divider></el-divider>
<div class="page">
  <div class="main">
    <!-- <main-content-item-2 :index="index">
      <template v-slot:item-icon></template>
      <template v-slot:item-title></template>
      <template v-slot:item-text></template>
      <template v-slot:item-likes><img src="../assets/img/likes02.png"></template>
      <template v-slot:item-likes-active><img src="../assets/img/likes01.png" ></template>
    </main-content-item-2> -->
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
        pager-count="5"
        :total="total">
      </el-pagination>
    </div>
  </div>
  <div class="side">
    <side-content :amount="amount"></side-content>
  </div>
</div>
  <bottom-content></bottom-content>
</template>

<script>
import BottomContent from './BottomContent.vue'
import MainContentItem from './MainContentItem.vue'
import SideContent from './SideContent.vue'

export default {
  name: "MainContent",
  components: {
    MainContentItem,
    SideContent,
    BottomContent,
  },
  data(){
    return{
    currentPage:1,
    index:1,
    total:8,
    amount:1,
    exist1:true,
    exist2:true
    }
  },
  created () {
        this.axios.get("/catalog/data").then((result)=>{
        this.total=(result.data.article_count)/3;
        this.index=result.data.article_count-1;
        this.amount=result.data.article_count-1;
      })
  },
  methods: {
     handleCurrentChange: function(currentPage){
       this.axios.get("/catalog/data").then((result)=>{
        this.currentPage = currentPage;
        this.index=result.data.article_count-(currentPage*3-2);
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
  .page {
    margin-left: 8px;
    margin-right: 8px;
  }
  /* body 外边距为0，实现容器外边距 */
  @media screen and (min-width: 960px){
    .page {
      display:flex;
      justify-content: space-between;
    }
    .side {
      margin-left:50px;
    }
  }
  .pageIndex {
    text-align: center;
  }
  /* 修改el-divider的样式 */
  .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 } 
</style>