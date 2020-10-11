import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios // 将axios方法 赋予vue prototype，其他文件中可直接用this.axios 而不用import axios

import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.filter('ellipsis', (str, arg) => {
  if (str.length > arg) {
    return str.substring(0, (arg - 4)) + '...'
  } else {
    return str
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
