<template>
  <top-bar :inUse4="true"></top-bar>
  <div class="about">
    <h1>This is an about page!!!</h1>
    <side-content :amount="amount"></side-content>
  </div>
</template>
<script>
import SideContent from '../components/SideContent'
import TopBar from '../components/TopBar.vue'
export default {
  components: { SideContent,TopBar},
  data () {
  return {
    amount:1
    }
  },
  mounted () {
    this.getAmount()
  },
  methods: {
    getAmount(){
        this.axios.get("/catalog/data").then(result=>{
        this.total=(result.data.article_count)/3;
        this.index=result.data.article_count-1;
        this.amount=result.data.article_count-1;
      })
  }
  }
}
</script>

<style scoped>
  .about {
    margin: 0 8px;
  }
</style>
