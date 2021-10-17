<template><!-- TabBarItem模板 -->
  <div class="tab-bar-item" @click="itemClick">

    <!-- 图片 -->
    <div class="item-icon">
      <!-- 不活跃 -->
      <slot v-if="!isActive" name="item-icon">导航栏原始图片</slot>
      <!-- 活跃 -->
      <slot v-else name="item-icon-active">导航栏活跃图片</slot>
    </div>

    <!-- 文字（动态绑定class） -->
    <div :class="{'item-text-active':isActive}">
      <slot name="item-text">导航栏文字</slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      // 从父组件获得path
      path: String
    },
    methods: {
      itemClick() {
        // 将要跳转页面的path
        let nextPath=this.path;
        // 当前页面的path
        let currentPath=this.$route.path;
        // 避免重复点击当前页报错
        if (nextPath!==currentPath){
          this.$router.replace(nextPath);
        }
    },
    },
    computed: {
      // 判断当前页面是否处于活跃，true：活跃；false：不活跃
      isActive() {
        /*
        * 判断逻辑是：取当前活跃页面的路径字符对从父组件
        * 获得的path进行比较，如果前者包含后者，说明当前
        * 页处于活跃。（包含indexOf的返回值就是0，return
        * true，不包含返回-1，return false）
        * */
        return this.$route.path.indexOf(this.path)===0;
      }
    }
  }
</script>

<style scoped>

  /* item样式 */
  .tab-bar-item {
    /* 依次从左往右顺序排列 */
    flex: 1;
    /* 文字居中 */
    text-align: center;
    /* 高度 */
    height: 49px;
    /* 文字大小 */
    font-size: 14px;
  }

  /* item图片样式 */
  .item-icon img{
    width: 24px;
    height: 24px;
  }

  /* item文字样式 */
  .item-text-active {
    color: #13227a;
  }

</style>
