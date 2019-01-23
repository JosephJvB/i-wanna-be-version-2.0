import io from 'socket.io-client'

import { POST, cacheGET, getUUID } from '../util'
// basic example: https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js
// good docs: https://vuex.vuejs.org/guide/modules.html
export default {
  state: {
    activeUsers: [],
    currentUser: null,
    socket: io()
  },
  /* TRIGGER explained:
  *   getter will run when a piece of state that it is looking at, changes.
  *   Im 'getting' from localstorage, but I still want this to run after state.currentUser changes
  *   just by referencing that property, this getter will run when that property changes 2ez
  */
  getters: {
    currentUsername(state, getters, rootState) {
      const trigger = state.currentUser
      const cachedUser = cacheGET('currentUser')
      return cachedUser ? cachedUser.username : ''
    },
    // for some reason this second getter works now lol
    currentUser(state, getters, rootState) {
      const trigger = state.currentUser
      const cachedUser = cacheGET('currentUser')
      return cachedUser ? cachedUser : ''
    },
    totalActiveUsers(state) {
      return state.activeUsers.length
    },
    activeUsers(state) {
      return state.activeUsers
    },
    socket(state, getters, rootState) {
      return state.socket
    }
  },
  // actions args[0] = { state(local), commit, rootState(global), dispatch }
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
      return response
    },
    async requestGuestLogin(store) {
      const uuid = getUUID()
      const response = await POST('api/v1/auth/login-as-guest', {guestId: uuid})
      if(response.error) {
        throw response.message
      }
      store.commit('setCurrentUser', response)
      return response
    },
    async initSockets(store) {
      const { socket } = store.state
      socket.on('active_user_change', users => store.commit('setActiveUsers', users))
    }
  },
  mutations: {
    setCurrentUser: (state, user) => {
      state.currentUser = user
    },
    removeCurrentUser: (state) => {
      // TODO: pass in user > check state > remove that user
      // state.activeUsers = state.activeUsers.filter(u => u.id !== user.id)
      state.currentUser = null
    },
    setActiveUsers: (state, total) => {
      state.activeUsers = total
    }
  }
}
