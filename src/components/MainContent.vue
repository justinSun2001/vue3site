<template>
<el-divider></el-divider>
<div class="page">
  <div class="main">
    <main-content-item-2 :index="index">
      <template v-slot:item-icon></template>
      <template v-slot:item-title></template>
      <template v-slot:item-text></template>
      <template v-slot:item-likes><img src="../assets/img/likes02.png"></template>
      <template v-slot:item-likes-active><img src="../assets/img/likes01.png" ></template>
    </main-content-item-2>
    <el-divider></el-divider>
  </div>
  <div class="main">
    <main-content-item-1 :index="index-1">
      <template v-slot:item-icon></template>
      <template v-slot:item-title></template>
      <template v-slot:item-text></template>
      <template v-slot:item-likes><img src="../assets/img/likes02.png"></template>
      <template v-slot:item-likes-active><img src="../assets/img/likes01.png" ></template>
    </main-content-item-1>
    <el-divider></el-divider>
  </div>
  <div class="main">
    <main-content-item :index="index-2">
      <template v-slot:item-icon></template>
      <template v-slot:item-title></template>
      <template v-slot:item-text></template>
      <template v-slot:item-likes><img src="../assets/img/likes02.png"></template>
      <template v-slot:item-likes-active><img src="../assets/img/likes01.png" ></template>
    </main-content-item>
    </div>
    <el-divider></el-divider>
  <div class="pageIndex">
<el-pagination
  background
  layout="prev, pager, next"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-size="1"
  :total="total">
</el-pagination>
  </div>
  <div class="side">
      <side-content :amount="amount"></side-content>
    </div>
</div>
  <bottom-content></bottom-content>
</template>

<script>
import BottomContent from './BottomContent.vue'
import MainContentItem from './MainContentItem'
import MainContentItem1 from './MainContentItem1.vue'
import MainContentItem2 from './MainContentItem2.vue'
import SideContent from './SideContent.vue'

export default {
  name: "MainContent",
  components: {
    MainContentItem,
    MainContentItem1,
    MainContentItem2,
    SideContent,
    BottomContent
  },
  data(){
    return{
    currentPage:1,
    index:1,
    total:8,
    amount:1
    }
  },
  mounted () {
    this.getAmount();
  },
  methods: {
     handleCurrentChange: function(currentPage){
       this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.currentPage = currentPage;
        this.index=result.data.article_count-(currentPage*3-2);
       })
      },
      getAmount(){
        this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.total=(result.data.article_count)/3;
        this.index=result.data.article_count-1;
        this.amount=result.data.article_count-1;
      })
  }
  }
}
</script>



<style scoped>
  .page {
  position: relative;
  }
  @media screen and (min-width: 1280px){
  .main {
    width:60%;
    height:225px;
  }
  .main img {
    width:25px;
    height:25px;
  }
  }
  @media screen and (max-width: 1280px){
  .main img {
    width:25px;
    height:25px;
  }
  }
  @media screen and (min-width: 1280px){
  .side {
    position: absolute;
    top:15px;
    right:0;
  }
  }
  .pageIndex {
    text-align: center;
    padding-top:50px;
  }
  
</style>