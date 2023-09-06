import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category/index'
import SubCategory from '@/views/category/sub'
import store from '@/store'
import { h } from 'vue'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const LoginCallback = () => import('@/views/login/callback')
const Cart = () => import('@/views/cart/index')
const PayCheckout = () => import('@/views/member/pay/checkout')
const PayIndex = () => import('@/views/member/pay/index')
const PayResult = () => import('@/views/member/pay/result')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const MemberOrder = () => import('@/views/member/order')
const MemberOrderDetail = () => import('@/views/member/order/detail')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
    { path: '/', component: Home },
    { path: '/category/:id', component: TopCategory },
    { path: '/category/sub/:id', component: SubCategory },
    { path: '/product/:id', component: Goods },
    { path: '/cart', component: Cart },
    { path: '/member/pay/checkout', component: PayCheckout },
    { path: '/member/pay', component: PayIndex },
    { path: '/pay/callback', component: PayResult },
    {
              path: '/member',
              component: MemberLayout,
              children: [
                { path: '/member', component: MemberHome },
                {
                  path: '/member/order',
                  // 创建一个RouterView容器形成嵌套关系
                  component: { render: () => h(<RouterView />) },
                  children: [
                    { path: '', component: MemberOrder },
                    { path: ':id', component: MemberOrderDetail }
                  ]
                }
              ]
            }
    ]
},
{ path: '/login', component: Login },
{ path: '/login/callback', component: LoginCallback }

]

const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes,
    scrollBehavior () {
        return { left: 0, top: 0 }
      }
})

router.beforeEach((to, from, next) => {
  const { token } = store.state.user.profile
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  } else {
    next()
  }
})

export default router
