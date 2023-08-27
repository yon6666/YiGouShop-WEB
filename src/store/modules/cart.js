
export default {
    namespaced: true,
    state () {
        return {
            list: []
                }
    },
    mutations (state, goods) {
        const sameIndex = state.list.findindex(item => item.skuId === goods.skuId)
        if (sameIndex > 0) {
            goods.count = state.list[sameIndex].count + goods.count
            state.list.splice(sameIndex, 1)
        }
        state.list.unshift(goods)
    }
}
