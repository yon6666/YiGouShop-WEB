<template>
    <div class="goods-sku">
      <dl v-for="item in goods.specs" :key="item.id">
        <dt>{{item.name}}</dt>
        <dd>
          <template v-for="val in item.values" :key="val.name">
            <img  :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
            <span :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
          </template>
        </dd>
      </dl>
    </div>
  </template>
  <script>
  import getPowerSet from '@/vender/power-set'
  const spliter = '★'
  const getPathMap = (skus) => {
    const pathMap = {}
        skus.forEach(
          sku => {
            if (sku.inventory > 0) {
              const specs = sku.specs.map(val => val.valueName)
              const powerSet = getPowerSet(specs)
              powerSet.forEach(arr => {
                const key = arr.join(spliter)
                  if (pathMap[key]) {
                  // 已经有key往数组追加
                  pathMap[key].push(sku.id)
                } else {
                  // 没有key设置一个数组
                  pathMap[key] = [sku.id]
                }
              })
            }
          }
        )
        return pathMap
  }
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedValues = getSelectedArr(specs)
    item.values.forEach(val => {
      if (val.selected) return
      selectedValues[i] = val.name
      const key = selectedValues.filter(value => value).join(spliter)
      val.disabled = !pathMap[key]
   })
})
}

const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(spec => {
    const selectedVal = spec.values.find(val => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}
  export default {
    name: 'GoodsSku',
    props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    updateDisabledStatus(props.goods.specs, pathMap)
    const clickSpecs = (item, val) => {
      if (val.disabled) {
        return
      }
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
    }
    return { clickSpecs }
  }
}

  </script>
  <style scoped lang="less">
  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
      border-color: @xtxColor;
    }
    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }
  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        > img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }
        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }
  </style>
