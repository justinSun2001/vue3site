<template>
  <div class="main-content-item" >

    <!-- 图片 -->
    <div class="item-icon">
      <img :src="url" @click="imgClick">
    </div>

    <div class="item-container">
      <!-- <div class="item-logo">
        Tips
      </div> -->
      <div class="item-title">
        {{title}}
      </div>
      <div class="item-text">
        {{message}}
      </div>
      <div class="state">
        <div class="item-bottom">

        </div>
        <div class="item-date">
          {{date}}
        </div>
      </div>
    </div>
  </div>
  <el-divider></el-divider>
</template>

<script>
export default {
  name: "MainContentItem",
   props: {
    index:Number,
  },
  data () {
    return {
      title:'无',
      message:'',
      date:'',
      url:''
    }
  },
  created(){
    this.axios.get("/catalog/articlesData").then((result)=>{
        let id=result.data[this.index]._id;
        this.axios.get("/catalog/articlesData/"+id+"").then((result)=>{
          this.title=result.data.article.title;
          this.message=result.data.article.summary;
          this.date=result.data.article.date;
          this.url=require('../assets/img/'+'item'+(this.index+1)+'.png');
        console.log(result);
      })
      })
  },
  updated () {
    this.axios.get("/catalog/articlesData").then((result)=>{
        if(this.index>=0){
          let id=result.data[this.index]._id;
          this.axios.get("/catalog/articlesData/"+id+"").then((result)=>{
          this.title=result.data.article.title;
          this.message=result.data.article.summary;
          this.date=result.data.article.date;
          this.url=require('../assets/img/'+'item'+(this.index+1)+'.png');
        console.log(result);
      })
        }
      })
  },
  methods: {
    imgClick(){
      this.$store.commit('getIndex', this.index);
      this.$router.push({
        path:"/articles/"+"article"+this.index+""
      })
    }
  }

}
</script>

<style scoped>
  /* 采用flex布局 */
  @media screen and (min-width: 480px){
    .main-content-item {
      display: flex;
      justify-content: space-between;
      padding-left: 25px;
    }
    .item-icon img {
    height:150px;
    width:200px;
    opacity: 0.9;
    border:1px solid rgb(238, 247, 236);
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  /* 添加一个用户交互，移到图像上会有一层阴影 */
  .item-icon :hover {
    opacity: 0.5;
  }
  .item-title {
    font-size: 20px;
  }
  .item-text {
    color:rgb(234, 59, 24);
  }
  .state {
    display:flex;
    justify-content: space-between;
  }
  .item-date {
    color:rgb(187, 177, 168);
  }
  }
  @media screen and (max-width: 480px){
    .main-content-item {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      height: 80px;
    }
    .item-icon img {
    height:80px;
    width:100px;
    opacity: 0.9;
    border:1px solid rgb(238, 247, 236);
    border-radius: 10px;
    margin-left: 10px;
  }
  .item-title {
    font-size: 15px;
  }
  .item-text {
    font-size: 10px;
    color:rgb(234, 59, 24);
  }
  .state {
    display:flex;
    justify-content: space-between;
  }
  .item-date {
    font-size: 10px;
    color:rgb(187, 177, 168);
  }
  }


  .item-container {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: nowrap;
    width:100%;
  }

  /* 修改el-divider的样式 */
  .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px solid #e8eaec;
 } 
 
</style>