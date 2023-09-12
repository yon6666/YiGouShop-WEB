<template>
    <div class="member-order">
      <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
      v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name">
      </XtxTabsPanel>
      </XtxTabs>
  <div class="order-list">
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel = "onCancelOrder"
        @on-delete-order="onDeleteOrder(item)"
        @on-confirm-order="onConfirmOrder(item)"
      />
  </div>
  </div>
      <!-- 订单列表 -->

  <XtxPagination
      v-if="total > requestParams.pageSize"
      @current-change="requestParams.page=$event"
      :total="total"
      :page-size="requestParams.pageSize"
      :current-page="requestParams.page"  />
   <!-- 取消原因组件 -->
   <OrderCancel ref="orderCancelCom" />
   <OrderLogistics ref="logisticsOrderCom" />
  </template>
  <script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/member'
import OrderCancel from './components/order-cancel'
import { deleteOrder, confirmOrder } from '@/api/order'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
import OrderLogistics from './components/order-logistics'

  export default {
    name: 'MemberOrder',
    components: { OrderItem, OrderCancel, OrderLogistics },
    setup () {
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    const tabClick = ({ index }) => {
      requestParams.orderState = index
      requestParams.page = 1
    }
    const orderList = ref([])
    const total = ref(0)
    const loading = ref(true)
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(requestParams, () => {
      findOrderListFn()
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }, { immediate: true })
    const onDeleteOrder = (item) => {
    Confirm({ text: '您确认删除该条订单吗？' }).then(() => {
         deleteOrder([item.id]).then(() => {
          Message({ text: '删除订单成功', type: 'success' })
          findOrderListFn()
        })
      }).catch(e => {})
    }

    return {

            tabClick,
            orderStatus,
            orderList,
            requestParams,
            total,
            loading,
            onDeleteOrder,
            ...useCancelOrder(),
            ...useConfirmOrder(),
            ...useLogisticsOrder()
                      }
  }
}
export const useCancelOrder = () => {
      const orderCancelCom = ref(null)
      const onCancelOrder = (item) => {
        orderCancelCom.value.open(item)
      }
      return { orderCancelCom, onCancelOrder }
    }
  const useConfirmOrder = () => {
  const onConfirmOrder = (item) => {
    Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      confirmOrder(item.id).then(() => {
      Message({ text: '确认收货成功', type: 'success' })
      item.orderState = 4
    })
    })
  }
  return { onConfirmOrder }
}

// 封装逻辑-查看物流
export const useLogisticsOrder = () => {
    const logisticsOrderCom = ref(null)
    const onLogisticsOrder = (item) => {
    logisticsOrderCom.value.open(item)
  }
  return { onLogisticsOrder, logisticsOrderCom }
}
  </script>
<style scoped lang="less">
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
