import request from '@/utils/request'

export const findCheckoutInfo = () => {
    return request('/member/order/pre', 'get')
}
