<template>
<!-- <div class="main">
  <div class="logo"><img src="../assets/img/logo1.png"><div class="img-text">Blog</div></div>
  <el-menu :default-active="$route.path" class="el-menu-nav" mode="horizontal" @select="handleSelect" text-color="black" active-text-color="#ffd04b" router>
    <el-menu-item index="/contact">CONTACT</el-menu-item>
    <el-menu-item index="/about">ABOUT</el-menu-item>
    <el-menu-item index="/articles">ARTICLES</el-menu-item>
    <el-menu-item index="/home">HOME</el-menu-item>
  </el-menu>
</div> -->
<div class="container">
  <div class="logo">
  </div>
  <ul class="nav">
    <li><router-link to="/home"> HOME </router-link></li>
    <li><router-link to="/articles"> ARTICLES </router-link></li>
    <li><router-link to="/contact"> CONTACT </router-link></li>
    <li><router-link to="/about"> ABOUT </router-link></li>
  </ul>
</div>

</template>

<script>
  export default {
    // data() {
    //   return {
    //   };
    // },
    // methods: {
    //   handleSelect(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
    // }
  }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #070707e5;
  font-size: 8px;
}
.logo {
  color:white;
  line-height: 50px;
}
.nav {
  display: flex;
  justify-content: flex-end;
}
.nav li {
  line-height: 50px;
  padding: 0px 10px; 
}

/* 消除 router-link默认样式 同时添加按钮动画*/
.router-link-active {
  text-decoration: noen;
  color: white;
}
a {
  text-decoration: none;
  color: white; 
  font-weight: bold;
}
a:hover {
  color: rgb(141, 138, 141);
}

/*消除列表默认样式*/
ul,li {
  margin: 0;
  padding: 0;
  list-style: none; 
}


</style>
