import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './config/router'
import users from './config/users.store-module'
import cachePlugin from './config/cache.store-plugin'
import Main from './main.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.mixin({ // things added here goes global to any component in the tree
  methods: {} // add global functions
})

new Vue({
  el: '#mount',
  // all main is is a router-view element to render route-matched-components
  // ya im a bit salty
  render: r => r(Main),
  router: new VueRouter(router),
  store: new Vuex.Store({
    modules: {
      users
    },
    plugins: [
      cachePlugin
    ]
  })
})
