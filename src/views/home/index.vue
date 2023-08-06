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
  <HomePannel title="推荐" subTitle="人气推荐AA" >
        <template #right><XtxMore path="/" /></template>
          <p>11111</p>
          <p>11111</p>
      </HomePannel>
  </template>
  <script>
  import HomePannel from './components/home-pannel'
  import HomeCategory from './components/home-category'
  import HomeBanner from './components/home-banner'

  export default {
    name: 'HomePage',
    components: {
    HomePannel,
      HomeCategory,
      HomeBanner

    }
  }
  </script>
  <style scoped lang="less"></style>
