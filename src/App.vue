<template>
  <div class="app">
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
export default {
  name: 'App',
  components: {
    TopBar,
  }
}
</script>

<style>

</style>
