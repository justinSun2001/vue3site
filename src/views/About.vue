<template>
  <div class="about">
    <h1>This is an about page!!!</h1>
    <side-content :amount="amount"></side-content>
  </div>
</template>
<script>
import SideContent from '../components/SideContent'
export default {
  components: { SideContent},
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
        this.axios.get("http://localhost:3000/catalog/data").then(result=>{
        this.total=(result.data.article_count)/3;
        this.index=result.data.article_count-1;
        this.amount=result.data.article_count-1;
      })
  }
  }
}
</script>

<style>

</style>
