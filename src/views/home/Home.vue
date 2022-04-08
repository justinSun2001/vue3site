<template>
  <top-bar :inUse1='true'></top-bar>
  <head-content></head-content>
  <main-content></main-content>
</template>

<script>
import MainContent from '../../components/MainContent.vue'
import HeadContent from '../../components/HeadContent.vue'
import TopBar from '../../components/TopBar.vue'
export default {
  name:"Home",
  components: {
    MainContent,
    HeadContent,
    TopBar,
  }
}
</script>