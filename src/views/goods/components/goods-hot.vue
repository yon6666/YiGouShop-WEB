<template>
    <div class="goods-hot">
      <h3>{{title}}</h3>
    </div>
    <div v-if="goodsList">
        <GoodsItem  v-for="item in goodsList" :key="item.id" :goods="item"></GoodsItem>
    </div>
  </template>
<script>
import { computed, ref } from 'vue'
import { findHotGoods } from '@/api/product'
import GoodsItem from '../../category/components/goods-item'
export default {
  name: 'GoodsHot',
  props: {
      type: {
          type: Number,
          default: 1
      },
      goodsId: {
          type: String,
          default: ''
      }
  },
  components: {
    GoodsItem
  },
  setup (props) {
      const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
      const title = computed(() => {
          return titleObj[props.type]
      })

      const goodsList = ref([])
      findHotGoods(props.id, props.type).then(data => {
        goodsList.value = data.result.map(item => {
            item.tag = item.desc
            return item
        })
      })
      return { title, goodsList }
  }
}

</script>
<style scoped lang="less"></style>
