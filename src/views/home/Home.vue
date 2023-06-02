<template>
  <div class="top">
    <top-bar :inUse1='true'></top-bar>
  </div>
  <div class="head">
    <head-content></head-content>
  </div>
  <el-divider></el-divider>
  <div class="page">
    <main-content :currentPage="Number(currentPage[0])"></main-content>
    <div class="side">
      <side-content :amount="amount"></side-content>
    </div>
  </div>
  <bottom-content></bottom-content>
</template>

<script>
import TopBar from '../../components/TopBar.vue'
import MainContent from '../../components/MainContent.vue'
import HeadContent from '../../components/HeadContent.vue'
import SideContent from '../../components/SideContent.vue'
import BottomContent from '../../components/BottomContent.vue'

export default {
  name:"Home",
  components: {
    MainContent,
    HeadContent,
    TopBar,
    SideContent,
    BottomContent,
  },
  data(){
    return{
      amount:1,
    }
  },
  computed: {
    currentPage(){
      return this.$route.params.id
    },
  },
  created () {
    this.axios.get("/catalog/data").then((result)=>{
    this.amount=result.data.article_count-1;
  })
  }

}
</script>

<style scoped>
  .top {
    width:100%;
    position:fixed;
    background-color: white;
    z-index:100; 
  }
  .head {
    padding-top: 54px;
  }
  .page {
    margin-left: 8px;
    margin-right: 8px;
    background-color: #f9f9fb;
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


  /* 修改el-divider的样式 */
  .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 } 
</style>