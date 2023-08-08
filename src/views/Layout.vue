<template>
    <AppTopnav/>
    <AppHeader/>
    <appHeaderSticky/>

    <div class="app-body">
      <!-- 二级路由 -->
      <RouterView />
    </div>

    <AppFooter/>
  </template>

  <script>
  import AppTopnav from '@/components/app-topnav.vue'
  import AppHeader from '@/components/app-header.vue'
  import { useStore } from 'vuex'
  import AppFooter from '@/components/app-footer.vue'
  import appHeaderSticky from '@/components/app-header-sticky.vue'
  export default {
    name: 'XtxLayout',
   components: { AppTopnav, AppHeader, AppFooter, appHeaderSticky },
   setup () {
    const store = useStore()
    store.dispatch('category/getCategory')
  }
  }

  </script>

  <style scoped lang='less'></style>
