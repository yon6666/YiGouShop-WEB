import { createStore } from 'vuex'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  modules: {
    cart, category, user
  },
    plugins: [
        createPersistedstate({
          key: 'erabbit-client-pc-store',
          paths: ['user', 'cart']
        })
      ]
})
