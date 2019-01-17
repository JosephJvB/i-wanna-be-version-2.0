// basic example: https://github.com/vuejs/vuex/blob/dev/examples/counter/store.js
// good docs: https://vuex.vuejs.org/guide/modules.html
export default {
  state: {
    currentUser: null
  },
  getters: {
    currentUsername: (state, getters, rootState) => state.currentUser && state.currentUser.username
  },
  // actions args[0] = { state(local), commit, rootState(global) }
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
  mutations: {
    setCurrentUser: (state, user) => {
      state.currentUser = user
    },
    removeCurrentUser: (state) => {
      // TODO: pass in user > check state > remove that user
      // state.activeUsers = state.activeUsers.filter(u => u.id !== user.id)
      state.currentUser = null
    }
  }
}

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
