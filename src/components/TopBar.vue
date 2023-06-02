<template>
<div class="container">
  <div class="left">
    <div class="user">
      <img src='../assets/img/user.png'/>
    </div>
  </div>
  <ul class="nav">
    <li><a :class="{a1:inUse1}" @click="getHome"> HOME </a></li>
    <li><a :class="{a1:inUse2}" @click="getArticles"> ARTICLES </a></li>
    <li><a :class="{a1:inUse3}" @click="getNbadata"> NBAData </a></li>
    <li><a :class="{a1:inUse4}" @click="getAbout"> ABOUT </a></li>
  </ul>
</div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props:["inUse1","inUse2","inUse3","inUse4"],
    methods: {
      getHome(){
        this.$router.push({
          path:"/home/"+this.$store.state.currentPage
        });
      },
      getArticles(){
        this.$router.push({
          path:"/articleList/"+this.$store.state.currentPage1
        });
      },
      getNbadata(){
        this.$router.push({
          path:"/nbadata/"+this.$store.state.userToken
        });
      },
      getAbout(){
        this.$router.push({
          path:"/about/"+this.$store.state.userToken
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
  background-color: #fff;
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
.a1 {
  border-bottom: 2px solid red;
}

/* 消除 router-link默认样式 同时添加按钮动画*/
/* .router-link-active {
  text-decoration: none;
  color: white;
} */
a {
  text-decoration: none;
  color: black; 
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
