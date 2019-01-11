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
  // each action has access to ALL store info, actions, state, getters. everything!
  actions: {
    async login(store, formData) {
      try {
        // do fetch
        const response = await POST('api/v1/auth/login', formData).then(res => res.json())
        // handle errors set by custom express api
        if(response.error) return console.error(response.message)
        store.commit('addCurrentUser', response)
        return response
      } catch (err) {
        console.error('client error @ login', err)
      }
    },
    async register(store, formData) {
      try{
        const response = await POST('api/v1/auth/register', formData).then(res => res.json())
        if(response.error) return console.error(response.message)
        store.commit('addCurrentUser', response)
        return response
      } catch (err) {
        console.error('client error @ register', err)
      }
    },
    async logout (store, user) {
      try {
        const response = await POST('api/v1/auth/logout', user).then(res => res.json())
        if(response.error) return console.error(response.message)
        // TODO: check state and remove that user
        store.commit('removeCurrentUser', user)
        return response
      } catch (err) {
        console.error('client error @ logout', err)
      }
    }
  },
  mutations: {
    addCurrentUser: (state, user) => {
      state.user = user
    },
    removeCurrentUser: (state, user) => {
      // TODO: check state and remove that user
      // state.activeUsers = state.activeUsers.filter(u => u.id !== user.id)
      state.user = null
    }
  }
}
// @ component level, state can be accessed by getters OR my $store.state
// also actions can be put into component methods with mapActions OR you can go $store.dispatch('actionName') I think. Need to check that one

// window.fetch wrapper for post requests
// stringifies data and adds headers
function POST (path, data) {
  return fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}