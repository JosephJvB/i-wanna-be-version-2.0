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
  state: {
    user: null
  },
  getters: {
    currentUsername: state => state.user && state.user.username
  },
  actions: {
    login: (context, user) => {
      context.commit('loginMutation', user) // second arg is the mutations payload
    },
    logout: (context, user) => {
      // TODO: check state and remove that user
      context.commit('logoutMutation', user)
    }
  },
  mutations: {
    loginMutation: (state, user) => {
      state.user = user
    },
    logout: (state, user) => {
      // TODO: check state and remove that user
      state.user = null
    }
  }
}