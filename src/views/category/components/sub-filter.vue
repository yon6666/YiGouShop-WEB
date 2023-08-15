<template>
<!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoading">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body">
         <a @click="filterData.brands.selectedBrand=item.id" :class="{active:item.id===filterData.brands.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>

       </div>
     </div>

     <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
       <div class="head">{{p.name}} :</div>
       <div class="body">
         <a @click="p.selectedProp=attr.id" :class="{active:attr.id===p.selectedProp}"  href="javascript:;" v-for="attr in p.properties" :key="attr.id">{{ attr.name }}</a>

       </div>
     </div>
   </div>
   <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { findTopCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
      watch(() => route.params.id, (newVal) => {
          if (newVal && `/category/sub/${newVal}` === route.path) {
            filterLoading.value = true
            findTopCategoryFilter(route.params.id).then(data => {
                data.result.brands.selectedBrand = null
                  data.result.brands.unshift({ id: null, name: '全部' })
                  data.result.saleProperties.forEach(item => {
                    item.selectedProp = null
                    item.properties.unshift({ id: null, name: '全部' })
                  })
                  filterData.value = data.result
                  filterLoading.value = false
              })
          }
      }, { immediate: true })

      return { filterData, filterLoading }
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .xtx-skeleton {
      padding: 10px 0;
    }
</style>
