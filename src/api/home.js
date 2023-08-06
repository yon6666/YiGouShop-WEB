
import request from '@/utils/request'
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit })
  }

  export const findBanner = () => {
    return request('/home/banner', 'get')
  }

  export const findNew = () => {
    return request('home/new', 'get')
  }
