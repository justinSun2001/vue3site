<template>
<div class="container">
  <div class="left">
    <div class="user">
      <img src='../assets/img/user.png'/>
    </div>
    <!-- <div class="icon">
      <img src='../assets/img/search.png'/>
    </div> -->
  </div>
  <ul class="nav">
    <li><a @click="getHome"> HOME </a></li>
    <li><a @click="getArticles"> ARTICLES </a></li>
    <li><a @click="getContact"> CONTACT </a></li>
    <li><router-link to="/about"> ABOUT </router-link></li>
  </ul>
</div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      getHome(){
        this.$router.push({
          path:"/home/"+this.$store.state.userToken
        });
      },
      getArticles(){
        this.$router.push({
          path:"/articles/"+this.$store.state.userToken
        });
      },
      getContact(){
        this.$router.push({
          path:"/contact/"+this.$store.state.userToken
        });
      },
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 54px;
  background-color: #070707e5;
  font-size: 8px;
}

.left {
  display: flex;
  justify-content: flex-start;
}
  .user {
    padding:12px 10px;
  }
  .user img {
    width:30px;
    height:30px;
    cursor: pointer;
  }
  .icon {
    padding:17px 10px;
  }
  .icon img {
    width:20px;
    height:20px;
    cursor: pointer;
  }


.nav {
  display: flex;
  justify-content: flex-start;
}
.nav li {
  line-height: 54px;
  padding: 0px 10px; 
}

/* 消除 router-link默认样式 同时添加按钮动画*/
.router-link-active {
  text-decoration: none;
  color: white;
}
a {
  text-decoration: none;
  color: white; 
  font-weight: bold;
  cursor: pointer;
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
