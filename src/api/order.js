import request from '@/utils/request'

export const findCheckoutInfo = () => {
    return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = (address) => {
    console.log(address)
    return request('/member/address', 'post', address)
  }

  /**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = (address) => {
    return request(`/member/address/${address.id}`, 'PUT', address)
  }

  /**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const createOrder = (order) => {
    return request('/member/order', 'post', order)
  }

  /**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
    return request('/member/order/' + id, 'get')
  }

  /**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}
