<template>
    <div class='xtx-goods-page' v-if="goods">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
          <XtxBreadItem :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
          <XtxBreadItem>{{goods.name}}</XtxBreadItem>
        </XtxBread>
              <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"/>
          <GoodsSales :goods="goods" />
        </div>
        <div class="spec">
          <GoodsName :goods="goods"/>
          <GoodsSku :goods="goods"  @change="changeSku" />
          <XtxNumbox  label="数量" v-model="num" :max="goods.inventory"></XtxNumbox >
          <XtxButton @click="insertCart()" type="primary" size="middle" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goods.id"/>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTabs :goods="goods"></GoodsTabs>
            <!-- 注意事项 -->
            <div class="goods-warn">
              <GoodsWarn/>
            </div>
          </div>
          <!-- 24热榜+专题推荐 -->
          <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
          </div>
      </div>
    </div>
  </div>
  </template>

  <script>
import { nextTick, ref, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
  export default {
    name: 'XtxGoodsPage',
    components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
    setup () {
      const num = ref(1)
      const goods = useGoods()
      const store = useStore()
      const currSku = ref(null)
      const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
        currSku.value = sku
      } else {
        currSku.value = null
      }
    }
      provide('goods', goods)

      const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        // id skuId name attrsText picture price nowPrice selected stock count isEffective
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          id,
          name,
          price,
          nowPrice: price,
          picture: mainPictures[0],
          selected: true,
          isEffective: true,
          count: num.value
        }).then(() => {
          Message({ type: 'success', text: '加入购物车成功' })
        })
      } else {
        Message({ text: '请选择完整规格' })
      }
    }
      return { goods, changeSku, num, insertCart }
    }
  }

  const useGoods = () => {
      const goods = ref(null)
      const route = useRoute()
      watch(() => route.params.id, (newVal) => {
        if (newVal && `/product/${newVal}` === route.path) {
          findGoods(route.params.id).then(data => {
            goods.value = null
            nextTick(() => {
              goods.value = data.result
            })
          })
        }
      }, { immediate: true })

      return goods
    }
  </script>

  <style scoped lang='less'>
  .goods-footer {
    display: flex;
    margin-top: 20px;
    .goods-article {
      width: 940px;
      margin-right: 20px;
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }
  .goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
  </style>
