<template>
    <div class="top-category">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>

          <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </transition>
        </XtxBread>
        <!-- 轮播图 -->
        <XtxCarousel :sliders="sliders" style="height:500px" />
        <!-- 所有二级分类 -->
        <div class="sub-list"  v-if=" topCategory && topCategory.children">
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
        <!-- 各个分类推荐商品 -->
        <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
      </div>
    </div>
  </template>
<script>
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
export default {
    name: 'TopCategory',
    components: {
      GoodsItem
    },
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

 // 获取各个子类目下推荐商品
 const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      newVal && getSubList()
    }, { immediate: true })

        return {
            sliders, topCategory, subList
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
      min-height: 160px;
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
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
