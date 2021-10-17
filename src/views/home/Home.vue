<template>
  <head-content></head-content>
   <main-content></main-content>
</template>

<script>
import MainContent from '../../components/MainContent.vue'
import HeadContent from '../../components/HeadContent.vue'
export default {
  name:"Home",
  components: {
    MainContent,
    HeadContent,
  }
}
</script>