<template>
  <div class="main-content-item" >

    <!-- 图片 -->
    <div class="item-icon">
      <slot name="item-icon"><img :src="url" @click="imgClick"></slot>
    </div>

    <div class="item-container">
      <div class="item-logo">
        Tips
      </div>
      <div class="item-title">
        <slot name="itme-title">{{title}}</slot>
      </div>
      <div class="item-text">
      <slot name="item-text">{{message}}</slot>
      </div>
      <el-divider></el-divider>
      <div class="item-bottom" @click.once="itemClick">
        <!-- 不活跃 -->
      <slot v-if="isActive" name="item-likes">原始图片</slot>
      <!-- 活跃 -->
      <slot v-else name="item-likes-active">活跃图片</slot>
      </div>
      <div class="item-likes">{{likes}}</div>
      <div class="item-date">{{date}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContentItem2",
  props: {
    index:Number,
  },
  data () {
    return {
      isActive:"true",
      title:'无',
      message:'',
      date:'',
      url:'',
    }
  },
  mounted () {
    this.getAll();
  },
  updated() {
    this.getUpdate();
  },
  methods: {
    itemClick(){
      this.$store.commit('increment');
      this.isActive=false;
    },
    imgClick(){
      this.$store.commit('getIndex', this.index);
      this.$router.push({
        path:"/articles/"+"article"+this.index+""
      })
    },
    getAll() {
      this.axios.get("http://localhost:3000/catalog/articlesData").then(result=>{
        let id=result.data[2]._id;
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id+"").then(result=>{
          this.title=result.data.article.title;
          this.message=result.data.article.summary;
          this.date=result.data.article.date;
          this.url=require('../assets/img/'+'item'+(this.index+1)+'.png');
        console.log(result);
      })
      })
    },
    getUpdate() {
      this.axios.get("http://localhost:3000/catalog/articlesData").then(result=>{
        let id=result.data[this.index]._id;
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id+"").then(result=>{
          this.title=result.data.article.title;
          this.message=result.data.article.summary;
          this.date=result.data.article.date;
          this.url=require('../assets/img/'+'item'+(this.index+1)+'.png');
        console.log(result);
      })
      })
    }
  },
  computed: {
    likes(){
      return this.$store.state.likes
    }
  }
}
</script>

<style scoped>
  .main-content-item {
    padding-left:50px;
    padding-top:25px;
    padding-right: 50px;
  }
  .item-icon img {
    height:175px;
    width:300px;
    opacity: 0.9;
    border:1px solid rgb(238, 247, 236);
    border-radius: 10px;
  }
  .item-container {
    padding-left: 320px;
    margin-top:-180px;
    height: 175px;
  }
  .item-logo {
    color: turquoise;
    padding-bottom: 3px;
  }
  .item-title {
    font-size: 20px;
  }
  .item-text {
    padding-top:10px;
    color:rgb(234, 59, 24);
  }
  .item-bottom {
    margin-top:-10px;
    width:25px;
    height:25px;
  }
  .item-likes {
    padding-left: 30px;
    margin-top: -20px;
    font-size: 10px;
  }
  .item-date {
    text-align: right;
    margin-top: -20px;
    color:rgb(187, 177, 168);
  }

</style>