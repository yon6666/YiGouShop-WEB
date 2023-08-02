<template>
    <AppTopnav/>
    <AppHeader/>
    <main>
      <!-- 二级路由 -->
      <router-view></router-view>
    </main>
    <footer>底部</footer>
  </template>

  <script>
  import AppTopnav from '@/components/app-topnav.vue'
  import AppHeader from '@/components/app-header.vue'
  export default {
    name: 'XtxLayout',
   components: { AppTopnav, AppHeader }
  }
  </script>

  <style scoped lang='less'></style>
