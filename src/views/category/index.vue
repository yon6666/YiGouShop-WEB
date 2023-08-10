<template>
    <div class="top-category">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem>{{topCategory.name}}</XtxBreadItem>
        </XtxBread>
        <!-- 轮播图 -->
        <XtxCarousel :sliders="sliders" style="height:500px" />
        <!-- 所有二级分类 -->
        <div class="sub-list">
          <h3>全部分类</h3>
          <ul>
            <li v-for="item in topCategory.children" :key="item.id">
              <a href="javascript:;">
                <img :src="item.picture" >
                <p>{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
        <!-- 不同分类商品 -->
      </div>
    </div>
  </template>
<script>
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
export default {

    name: 'TopCategory',

    setup () {
        const sliders = ref([])
        findBanner().then(data => {
            sliders.value = data.result
        })

        const store = useStore()
        const route = useRoute()
            const topCategory = computed(() => {
                let cate = {}
                const item = store.state.category.list.find(item => {
        return item.id === route.params.id
            })
      if (item) cate = item
      return cate
        })

        return {
            sliders, topCategory
        }
    }

}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
