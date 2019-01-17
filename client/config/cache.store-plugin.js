import { cacheSET, cacheREMOVE } from '../util.js'

export default (store) => {
  store.subscribe((mutation, rootState) => {
    switch(mutation.type) {
      case 'setCurrentUser': cacheSET('currentUser', mutation.payload)
        break 
      case 'removeCurrentUser': cacheREMOVE('currentUser')
        break
      default:
        break
    }
  })
}
