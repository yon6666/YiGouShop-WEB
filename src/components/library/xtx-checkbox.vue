<template>
    <div class="xtx-checkbox" @click="change()">
      <i v-if="checked" class="iconfont icon-checked"></i>
      <i v-else class="iconfont icon-unchecked"></i>
      <span>{{ $slots.default }}<slot/></span>
    </div>
  </template>
  <script>
  import { ref } from 'vue'
export default {
    name: 'XtxCheckbox',
    setup () {
        const checked = ref(false)
        const change = () => {
            checked.value = !checked.value
        }
        return {
            checked, change
        }
    }
}
</script>
<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
