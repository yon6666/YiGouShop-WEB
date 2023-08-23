<template>
    <div class="goods-detail">详情</div>
  </template>
  <script>
import { inject } from 'vue'
  export default {
    name: 'GoodsDetail',
    setup () {
      const goods = inject('goods')
      return { goods }
    }
  }
  </script>
  <style scoped lang="less"></style>
