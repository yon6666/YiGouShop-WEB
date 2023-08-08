<template>
    <!-- 首页入口 -->
    <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />

    </div>

  </div>
   <HomeNew />
   <HomeHot />
   <HomeBrand />
   <HomeProduct />
  </template>

  <script>
  import HomeCategory from './components/home-category'
  import HomeBanner from './components/home-banner'
  import HomeNew from './components/home-new'
  import HomeHot from './components/home-hot'
  import HomeBrand from './components/home-brand'
  import HomeProduct from './components/home-product'
  export default {
    name: 'HomePage',
    components: {
      HomeCategory,
      HomeBanner,
      HomeNew,
      HomeHot,
      HomeBrand,
      HomeProduct

    }
  }
  </script>
  <style scoped lang="less"></style>
