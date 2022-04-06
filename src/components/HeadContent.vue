<template>
<div :style="{height:200 + 'px', backgroundImage: moodColor}">
  <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/articles' }">Articles</el-breadcrumb-item>
  <el-breadcrumb-item>SC</el-breadcrumb-item>
</el-breadcrumb> -->
  <div class="top">
    <div v-if = 'nochange' @click = 'showBtn'>切换背景</div>
    <button v-if = 'change' @click = 'mood1'>暖色调</button>
    <button v-if = 'change' @click = 'mood2'>冷色调</button>
  </div>
  <div class="main">{{title}}</div>
  <div class="content">{{text}}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:'Lifestyle',
      text:'哎呀！出错啦',
      moodColor:'linear-gradient(to right, blue, purple',
      nochange: true,
      change: false,
    }
  },
  methods: {
    showBtn(){
      this.nochange=false;
      this.change=true;
    },
    mood1() {
      this.moodColor='linear-gradient(to right, red, orange';
      this.change=false;
      this.nochange=true;
    },
    mood2() {
      this.moodColor='linear-gradient(to right, cyan, gray';
      this.change=false;
      this.nochange=true;
    },
  }
}
</script>

<style scoped>
  .top {
    text-align: center;
  }
  .top div {
    font-size: 10px;
  }
  button {
    background-color: rgb(238, 212, 212);
    border: 0.5px solid;
    color: black;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    cursor: pointer;
  }
  .main {
    text-align: center;
    color:white;
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .content {
    text-align: center;
    padding-left: 15%;
    padding-right: 15%;
    color:#f7fafcd3;
    font-size: 10px;
  }

</style>