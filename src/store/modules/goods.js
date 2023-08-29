import request from '@/utils/request'

export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
  }
