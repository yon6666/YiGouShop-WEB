<template>
    <div class="sub-category">
        <div class="container">
      <!-- 面包屑 -->
        <SubBread />
        <SubFilter />
        <xtx-checkbox>全选</xtx-checkbox>
    </div>
    </div>
</template>
<script>
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
    name: 'SubCategory',
    components: {
        SubBread,
SubFilter,
        XtxCheckbox
    }

}
</script>
<style scoped lang="less"></style>
