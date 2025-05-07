import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/main.scss'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.silent = true

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')