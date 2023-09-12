<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
        <!-- 步骤条-->
    <XtxSteps :active="order.orderState===6?1:order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货" :desc="order.evaluationTime" />
      <XtxStepsItem title="订单完成" :desc="order.endTime" />
    </XtxSteps>
    <!-- 物流区块 -->
    <Suspense  v-if="[3,4,5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
  </div>
</template>
<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action'
import DetailLogistics from './components/detail-logistics'
export default {
    name: 'OrderDetailPage',
    components: { DetailAction, DetailLogistics },

    setup () {
        const order = ref(null)
        const route = useRoute()
        findOrder(route.params.id).then(data => {
            order.value = data.result
        })
        return { order }
    }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
