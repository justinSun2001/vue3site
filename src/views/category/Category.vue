<template>
  <h2>分类{{message}}</h2>
  <button @click="redirect()"><a href="http://localhost:3000">点我</a></button>
</template>

<script>
export default {
  name:"Category",
  data() {
    return {
      message:'',

    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.message=result.data._count;
        console.log(result);
      }),
      this.axios.get("http://localhost:3000/catalog/articlesData").then(result=>{
        var id=result.data[0]._id;
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id+"").then(result=>{
        console.log(result);
      })
      })
    }
  }
}
</script>