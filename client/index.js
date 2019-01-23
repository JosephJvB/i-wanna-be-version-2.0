import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
  cachePlugin,
  router,
  usersModule,
} from './config'
import Main from './main.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.mixin({
  methods: {} // add global functions
})

new Vue({
  el: '#mount',
  render: r => r(Main),
  router: new VueRouter(router),
  store: new Vuex.Store({
    modules: {
      users: usersModule
    },
    plugins: [
      cachePlugin
    ]
  })
})
