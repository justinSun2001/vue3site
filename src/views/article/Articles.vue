<template>
  <div class="top">
    <top-bar :inUse2="true"></top-bar>
  </div>
  <div class="page">
    <articles-content :currentPage="Number(currentPage[0])"></articles-content>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar.vue'
import ArticlesContent from './ArticlesContent.vue'
export default {
  components: { ArticlesContent,TopBar },
  computed: {
    currentPage(){
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.top {
    width:100%;
    position:fixed;
    background-color: white;
    z-index:100;
  }
.page {
  padding-top: 54px;
  background-color: #f9f9fb;
}
</style>