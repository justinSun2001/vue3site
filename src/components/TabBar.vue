<template>
  <div class="tab-bar">

    <!--首页-->
    
    <tab-bar-item path="/home">
      <template v-slot:item-icon><img src="../assets/img/3.png" alt="首页"></template>
      <template v-slot:item-icon-active><img src="../assets/img/4.png" alt="首页" ></template>
      <template v-slot:item-text><div>首页</div></template>
    </tab-bar-item>

    <!--分类-->
    <tab-bar-item path="/category">
      <template v-slot:item-icon><img src="../assets/img/1.png" alt="分类"></template>
      <template v-slot:item-icon-active><img src="../assets/img/2.png" alt="分类"></template>
      <template v-slot:item-text><div>分类</div></template>
    </tab-bar-item>

    <!--购物车-->
    <tab-bar-item path="/shopcart">
      <template v-slot:item-icon><img src="../assets/img/5.png" alt="购物车"></template>
      <template v-slot:item-icon-active><img src="../assets/img/6.png" alt="购物车"></template>
      <template v-slot:item-text><div>购物车</div></template>
    </tab-bar-item>

    <!--我的-->
    <tab-bar-item path="/profile">
      <template v-slot:item-icon><img src="../assets/img/7.png" alt="我的"></template>
      <template v-slot:item-icon-active><img src="../assets/img/8.png" alt="我的"></template>
      <template v-slot:item-text><div>我的</div></template>
    </tab-bar-item>

  </div>
</template>


<script>
  // 导入TabBarItem
  import TabBarItem from "./TabBarItem";

  export default {
    name: "TabBar",
    components:{
      TabBarItem
    }
  }
</script>

<style scoped>

  .tab-bar{
    /* 依次从左往右顺序排列 */
    display: flex;
    /* 背景颜色 */
    background-color: #f6f6f6;
    /* 位置固定 */
    position: fixed;
    /* 位置固定到屏幕最下方 */
    left: 0;
    right: 0;
    bottom: 0px;
  }
  .tab-bar img{
    width: 24px;
    height: 24px;
  }

</style>

