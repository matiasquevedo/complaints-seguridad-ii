import Vue from "vue"
import App from "./App.vue"
import Vuex from 'vuex'
import router from './router'
import Notifications from 'vue-notification'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import drizzleVuePlugin from "@drizzle/vue-plugin"
import drizzleOptions from "./drizzleOptions"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vuex)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Notifications)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.use(drizzleVuePlugin, { store, drizzleOptions })

new Vue({
  store: store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app")