import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Main from './main.vue'
import { router, store } from './vue.config.js'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.mixin({ // things added here goes global to any component in the tree
  methods: {} // add global functions
})

new Vue({
  el: '#mount',
  // all main is is a router-view element to render route-matched-components
  // ya im a bit salty
  render: r => r(Main),
  router: new VueRouter(router),
  store: new Vuex.Store(store)
})