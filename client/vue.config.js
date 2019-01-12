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

// STORE:
// this is kinda like vue's verson of a redux-bundle? https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js
// Have one object for users with actions, getters etc, have another for some other kinda of data
// so that's with modules..Modules contain seperate state/getters/actions etc
 // https://vuex.vuejs.org/api/#modules
/*
  const store = {
    modules: {
      users: {state, getters, actions, mutations},
      otherData: {state, getters, actions, mutations}
    },
    plugins,  <- add caching here
    strict: debug <- some loggin thing? I dunno
  }
  // INSIDE A MODULE{
    actions: {
      testAction(store) => {
        store.state = local module state
        store.actions/getters/mutations = local module things
        store.rootState = global state
      }
    }
  }
*/
// https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js
export const store = {
  // STATE
  state: {
    user: null
  },
  // GETTERS
  // https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js
  // getters have access to other getters in second arg!! I like vuex
  getters: {
    currentUsername: (state, getters, rootState) => state.user && state.user.username
  },
  // ACTIONS
  // each action has access to ALL store info, actions, state, getters. everything!
  actions: {
    async requestLogin(store, formData) {
      const response = await POST('api/v1/auth/login', formData)
      if(response.error) {
        // TODO: set error in state for component to look at?
        throw response.message // caught at component
      }
      store.commit('setCurrentUser', response)
      return response
    },
    async requestRegister(store, formData) {
      const response = await POST('api/v1/auth/register', formData)
      if(response.error) {
        // TODO: set error in state for component to look at?
        throw response.message // caught at component
      }
      store.commit('setCurrentUser', response)
      return response
    },
    async requestLogout (store, user) {
      const response = await POST('api/v1/auth/logout', user)
      if(response.error) {
        // TODO: set error in state for component to look at?
        throw response.message // caught at component
      }
      store.commit('removeCurrentUser')
    }
  },
  // MUTATIONS
  mutations: {
    setCurrentUser: (state, user) => {
      state.user = user
    },
    removeCurrentUser: (state) => {
      // TODO: pass in user > check state > remove that user
      // state.activeUsers = state.activeUsers.filter(u => u.id !== user.id)
      state.user = null
    }
  }
}
// @ component level, state can be accessed by getters OR my $store.state
// also actions can be put into component methods with mapActions OR you can go $store.dispatch('actionName') I think. Need to check that one

// this feels like it's a bit lost..
function POST (path, data)  {
  return fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
