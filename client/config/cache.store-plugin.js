import { cacheSET, cacheREMOVE } from '../util.js'

// could really do this work IN the mutations themselves ay
// it's cool to have this as a general example for a store plugin tho
// cacheREMOVE('currentUser')
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
