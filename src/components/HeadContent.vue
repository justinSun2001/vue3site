<template>
<div class="head">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/articles' }">Articles</el-breadcrumb-item>
  <el-breadcrumb-item>SC</el-breadcrumb-item>
</el-breadcrumb>
  <div class="main">{{title}}</div>
  <div class="content">{{text}}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title:'Lifestyle',
      text:''
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.axios.get("http://39.107.99.66:3000/catalog/articlesData").then(result=>{
        let id=result.data[0]._id;
        this.axios.get("http://39.107.99.66:3000/catalog/articlesData/"+id+"").then(result=>{
          this.title=result.data.article.title;
          this.text=result.data.article.summary;
      })
      })
    }
  }
}
</script>

<style scoped>
  .head {
    height:200px;
    background-color: rgb(157, 216, 158);
  }
  .main {
    text-align: center;
    color:white;
    font-size: 20px;
    padding-top: 50px;
    padding-bottom: 20px;
  }
  .content {
    text-align: center;
    padding-left: 15%;
    padding-right: 15%;
    color:#7e868bd3;
    font-size: 10px;
  }
</style>