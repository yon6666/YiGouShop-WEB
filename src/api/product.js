import request from '@/utils/request'

export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
  }

  export const findHotGoods = (id, type, limit = 3) => {
    return request('/goods/hot', 'get', { id, type, limit })
  }
