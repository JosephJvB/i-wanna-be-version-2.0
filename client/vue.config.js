import Login from './components/login.vue'
import Home from './components/home.vue'

export const router = {
  routes: [
    {
      path: '/',
      component: Login // login will handle login and register
    },
    {
      path: '/home',
      component: Home
    }
  ]
}

// https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js
export const store = {
  state: {},
  getters: {}, // eg: state => state.user
  actions: {}, // eg: ({commit, state}) => commit('mutation-name')
  mutations: {} // eg: setUser = (state, payload) => state.user = payload
}
// mutations do what reducers in redux do(kinda). Must be sync
// actions can be async, how do you call mutation with a payload?