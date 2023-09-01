import { getNewCartGoods, mergeLocalCart, findCartList, insertCart, deleteCart, updateCart, checkAllCart } from '@/api/cart'

export default {
    namespaced: true,
    state () {
        return {
            list: []
                }
    },
    mutations: {
      insertCart (state, goods) {
        const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
        if (sameIndex > -1) {
            goods.count = state.list[sameIndex].count + goods.count
            state.list.splice(sameIndex, 1)
        }
        state.list.unshift(goods)
    },
      updateCart (state, goods) {
        const updateGoods = state.list.find(item => item.skuId === goods.skuId)
        for (const key in goods) {
          if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
            updateGoods[key] = goods[key]
          }
        }
      },
      deleteCart (state, skuId) {
        const index = state.list.findIndex(item => item.skuId === skuId)
        state.list.splice(index, 1)
      },
      setCartList (state, list) {
        state.list = list
      }
  },
    actions: {
      // 全选购物车
        checkAllCart (ctx, selected) {
          return new Promise((resolve, reject) => {
            if (ctx.rootState.user.profile.token) {
              // 已登录 TODO
              checkAllCart({ selected, ids: ctx.getters.validList.map(item => item.skuId) }).then(() => {
                return findCartList()
              }).then((data) => {
                            ctx.commit('setCartList', data.result)
                            resolve()
              })
            } else {
              // 未登录
              ctx.getters.validList.forEach(item => {
                ctx.commit('updateCart', { skuId: item.skuId, selected })
              })
              resolve()
            }
          })
        },
        insertCart (ctx, goods) {
          return new Promise((resolve, reject) => {
            if (ctx.rootState.user.profile.token) {
                insertCart(goods).then(() => {
                  return findCartList()
                }).then((data) => {
                  ctx.commit('setCartList', data.result)
                  resolve()
                })
            } else {
              // 未登录
              ctx.commit('insertCart', goods)
              resolve()
            }
          })
        },
        findCartList (ctx) {
          return new Promise((resolve, reject) => {
           if (ctx.rootState.user.profile.token) {
            findCartList().then(data => {
                   ctx.commit('setCartList', data.result)
                          resolve()
                   })
           } else {
          // 本地
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          // 传参事promise数组
              const promiseArr = ctx.state.list.map(item => {
                return getNewCartGoods(item.skuId)
              })
              Promise.all(promiseArr).then(dataArr => {
                 dataArr.forEach((data, i) => {
                   ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
                 })
                 resolve()
              }).catch(e => {
                reject(e)
              })
           }
          })
        },
        deleteCart (ctx, skuId) {
          return new Promise((resolve, reject) => {
            if (ctx.rootState.user.profile.token) {
              deleteCart([skuId]).then(() => {
                return findCartList()
              }).then((data) => {
                ctx.commit('setCartList', data.result)
                resolve()
              })
            } else {
              ctx.commit('deleteCart', skuId)
              resolve()
            }
          })
    },
    updateCart (ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart(goods).then(() => {
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
          // 已登录 TODO
        } else {
          // 未登录
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldSkuId]).then(() => {
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
          // 已登录 TODO
        } else {
          // 未登录
          // 你修改了sku的时候其实skuId需要更改，相当于把原来的信息移出，创建一条新的商品信息。
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
           // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    async mergeLocalCart  (ctx) {
      const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      await mergeLocalCart(cartList)
      ctx.commit('setCartList', [])
    }

  },
    getters: {
          // 有效商品列表
      validList (state) {
         return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
      },
          // 有效商品件数
      validTotal (state, getters) {
        return getters.validList.reduce((total, goods) => total + goods.count, 0)
      },
        // 有效商品总金额
        validAmount (state, getters) {
          return getters.validList.reduce((total, goods) => total + goods.nowPrice * 100 * goods.count, 0) / 100
        },
            // 无效商品列表
        invalidList (state) {
          return state.list.filter(goods => !(goods.stock > 0 && goods.isEffective))
       },
        // 选中商品列表
        selectedList (state, getters) {
          return getters.validList.filter(item => item.selected)
        },
       // 选中商品件数
       selectedTotal (state, getters) {
         return getters.selectedList.reduce((total, goods) => total + goods.count, 0)
       },
       // 选中商品总金额
       selectedAmount (state, getters) {
         return getters.selectedList.reduce((total, goods) => total + goods.nowPrice * 100 * goods.count, 0) / 100
       },
          // 是否全选
        isCheckAll (state, getters) {
          return getters.validList.length === getters.selectedList.length && getters.selectedList.length > 0
        }
    }

}
