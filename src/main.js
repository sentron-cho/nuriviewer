import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib/framework'
import lodash from 'lodash'
import store from './store'

// Lodash window 전역 설정
window._ = lodash

Vue.use(Vuetify)

const vuetify = new Vuetify({})

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app')
