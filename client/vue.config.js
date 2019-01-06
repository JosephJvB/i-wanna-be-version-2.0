import Login from './components/login.vue'
import Register from './components/register.vue'
import Home from './components/home.vue'

export const router = {
  routes: [
    { // this seems weird but whatever
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
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