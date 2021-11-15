<template>
<div class="main">
  <div class="logo"><img src="../assets/img/logo1.png"><div class="img-text">Blog</div></div>
  <el-menu :default-active="$route.path" class="el-menu-nav" mode="horizontal" @select="handleSelect" text-color="black" active-text-color="#ffd04b" router>
    <el-menu-item index="/contact">CONTACT</el-menu-item>
    <el-menu-item index="/about">ABOUT</el-menu-item>
    <el-menu-item index="/articles">ARTICLES</el-menu-item>
    <el-menu-item index="/home">HOME</el-menu-item>
  </el-menu>
</div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.main {
  position: relative;
}
@media screen and (max-width: 720px){
.logo {
  position: absolute;
  z-index: 999;
  top:8px;
  }
img {
  height:40px;
  width:23px;
  }
  .img-text {
  display: none;
  }
}
@media screen and (min-width: 720px){
.logo {
  position: absolute;
  z-index: 999;
  top:8px;
  }
img {
  height:40px;
  width:23px;
  }
  .img-text {
  position: absolute;
  z-index: 999;
  top:15px;
  left: 25px;
  font-size:20px;
  }
}
.el-menu-nav li {
    float: right;
  }

</style>
