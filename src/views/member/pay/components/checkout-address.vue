<template>
    <div class="checkout-address">
      <div class="text">
        <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
          <li><span>联系方式：</span>{{showAddress.contact}}</li>
          <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
        </ul>
        <a href="javascript:;">修改地址</a>
      </div>
      <div class="action">
        <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
        <XtxButton @click="openAddressEdit({})" class="btn">添加地址</XtxButton>
      </div>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
    <div class="text item" v-for="item in list" :key="item.id"
        :class="{active:selectedAddress&&item.id===selectedAddress.id}"
        @click="selectedAddress=item">
        <ul>
         <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
        </ul>
      </div>
        <template v-slot:footer>
        <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton  @click="confirmAddress()" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <AddressEdit ref="addressEdit" />
  </template>
  <script>
  import { ref } from 'vue'
  import AddressEdit from './address-edit'
  export default {
    name: 'CheckoutAddress',
    components: { AddressEdit },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        const dialogVisible = ref(false)
        const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // 加上一个注释：忽略下面代码的检查eslint
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }
        emit('change', showAddress.value && showAddress.value.id)

        const openDialog = () => {
            dialogVisible.value = true
            selectedAddress.value = null
        }

        const confirmAddress = () => {
            dialogVisible.value = false
            showAddress.value = selectedAddress.value
            emit('change', showAddress.value?.id)
        }
        const selectedAddress = ref(null)
        const addressEdit = ref(null)
        const openAddressEdit = (address) => {
            addressEdit.value.open(address)
        }
        return { showAddress, dialogVisible, selectedAddress, openDialog, confirmAddress, openAddressEdit, addressEdit }
    }
  }
  </script>
  <style scoped lang="less">
  .checkout-address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      .none {
        line-height: 90px;
        color: #999;
        text-align: center;
        width: 100%;
      }
      > ul {
        flex: 1;
        padding: 20px;
        li {
          line-height: 30px;
          span {
            color: #999;
            margin-right: 5px;
            > i {
              width: 0.5em;
              display: inline-block;
            }
          }
        }
      }
      > a {
        color: @xtxColor;
        width: 160px;
        text-align: center;
        height: 90px;
        line-height: 90px;
        border-right: 1px solid #f5f5f5;
      }
    }
    .action {
      width: 420px;
      text-align: center;
      .btn {
        width: 140px;
        height: 46px;
        line-height: 44px;
        font-size: 14px;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
  </style>
