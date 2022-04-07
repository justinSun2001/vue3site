<template>
  <top-bar></top-bar>
  <articles-content></articles-content>
</template>

<script>
import TopBar from '../../components/TopBar.vue'
import ArticlesContent from './ArticlesContent.vue'
export default {
  components: { ArticlesContent,TopBar },
}
</script>

<style>

</style>